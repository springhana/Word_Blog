import NoteModal from '../modal/NoteModal';
import WriteContainer from './WriteContainer';

export default function WriteCard() {
  return (
    <div style={{ zIndex: 10 }}>
      <NoteModal />
      <WriteContainer />
    </div>
  );
}
