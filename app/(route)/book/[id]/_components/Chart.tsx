import { NoteType } from '@/types/word_blog';
import getGraph from '@/utils/graph';
import axios from 'axios';
import * as d3 from 'd3';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import styles from '@/styles/Book.module.css';

const ForceGraph2D = dynamic(
  () => import('react-force-graph-2d').then(mod => mod.default),
  {
    ssr: false,
  }
);

export default function Chart({ note }: { note: NoteType[] }) {
  if (!note) {
    return null;
  }

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { nodes, links } = getGraph(note) as {
    nodes: d3.SimulationNodeDatum[];
    links: { source: string; target: string }[];
  };

  useEffect(() => {
    const simulation = d3
      .forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('charge', d3.forceManyBody().strength(-200))
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(100)
      );
  }, []);

  const rootId = note[0].userID;

  const nodesById = useMemo(() => {
    const nodesById = Object.fromEntries(
      nodes.map((node: any) => [node.id, node])
    );

    nodes.forEach((node: any) => {
      node.collapsed = node.id !== rootId;
      node.childLinks = [];
    });
    links.forEach((link: any) => nodesById[link.source].childLinks.push(link));

    return nodesById;
  }, []);

  const getPrunedTree = useCallback(() => {
    const visibleNodes = [];
    const visibleLinks = [];
    (function traverseTree(node = nodesById[rootId]) {
      visibleNodes.push(node);
      if (node.collapsed) return;
      visibleLinks.push(...node.childLinks);
      node.childLinks
        .map((link: { source: string; target: string }) =>
          typeof link.target === 'object' ? link.target : nodesById[link.target]
        )
        .forEach(traverseTree);
    })();

    return { nodes: visibleNodes, links: visibleLinks };
  }, [nodesById]);

  const [prunedTree, setPrunedTree] = useState(getPrunedTree());

  const handleNodeClick = useCallback(
    (node: {
      [others: string]: any;
      id?: string | number | undefined;
      x?: number | undefined;
      y?: number | undefined;
      vx?: number | undefined;
      vy?: number | undefined;
      fx?: number | undefined;
      fy?: number | undefined;
    }) => {
      if (node.id !== '0') {
        node.collapsed = !node.collapsed;
        setPrunedTree(getPrunedTree());
      }
      const id = node.id as string;
      if (node.id && id.includes('/')) {
        router.push(`/detail/${id.split('/')[1]}`);
      }
    },
    [getPrunedTree]
  );

  return (
    <div className={styles.graph}>
      <ForceGraph2D
        onNodeClick={handleNodeClick}
        graphData={prunedTree}
        nodeAutoColorBy="group"
        nodeCanvasObjectMode={() => 'after'}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.value;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'black';

          if (node.isClusterNode) {
            ctx.fillText(label, node.x as number, node.y as number);
          } else {
            ctx.fillText(
              label,
              (node.x as number) + 20,
              (node.y as number) + 0
            );
          }
        }}
        nodeVisibility={node => node.id !== '0'}
        nodeLabel={id => {
          setName('');
          setLoading(true);
          const _id = id.id as string;
          axios
            .get('/api/card', {
              params: {
                _id: _id.split('/')[1],
                state: 'title',
              },
            })
            .then(res => {
              setName(res.data);
              setLoading(false);
            });

          if (!loading) {
            return name;
          } else {
            return '';
          }
        }}
      />
    </div>
  );
}
