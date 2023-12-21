import { NoteType } from '@/types/word_blog';

export default function getGraph(note: NoteType[]) {
  if (!note[0]) {
    return null;
  }

  const nodes: { id: string; value: string; val: number; color: string }[] = [
    { id: note[0].userID, value: '본인', val: 0, color: getColor(0) },
  ];
  note.map((item, index) => {
    nodes.push({
      id: item._id,
      value: item.name + ' (' + item.cardID.length + ')',
      val: item.cardID.length,
      color: getColor(index + 1),
    });
    if (item.cardID) {
      item.cardID.map(id => {
        nodes.push({
          id: index + '/' + id,
          value: '',
          val: 1,
          color: getColor(index + 1),
        });
      });
    }
  });

  const links: { source: string; target: string }[] = [];
  note.map((item, index) => {
    links.push({ source: note[0].userID, target: item._id });
    if (item.cardID) {
      item.cardID.map(id => {
        links.push({ source: item._id, target: index + '/' + id });
      });
    }
  });

  return { nodes, links };
}

const getColor = (n: number) => {
  return '#' + ((n * 1234567) % Math.pow(2, 24)).toString(16).padStart(6, '0');
};
