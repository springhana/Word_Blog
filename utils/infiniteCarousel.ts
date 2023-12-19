export const GotoSlider = (
  index: number,
  ref_all: HTMLDivElement,
  ref_one: HTMLDivElement
) => {
  ref_all.style.transition = '0.3s all';
  ref_all.style.right = `${ref_one.offsetWidth * index}px`;
};

export const BtnPrev = (
  ref_all: HTMLDivElement,
  ref_one: HTMLDivElement,
  currentIndex: number,
  setCurrentIndex: (index: number) => void
) => {
  if (ref_all && ref_one && currentIndex > 0) {
    GotoSlider(currentIndex - 1, ref_all, ref_one);
    setCurrentIndex(currentIndex - 1);
  }
};
export const BtnNext = (
  ref_all: HTMLDivElement,
  ref_one: HTMLDivElement,
  currentIndex: number,
  setCurrentIndex: (index: number) => void,
  length: number
) => {
  if (ref_all && ref_one && currentIndex <= length) {
    GotoSlider(currentIndex + 1, ref_all, ref_one);
    setCurrentIndex(currentIndex + 1);
  }
};

export const TransitionEnd = (
  ref_all: HTMLDivElement,
  ref_one: HTMLDivElement,
  currentIndex: number,
  setCurrentIndex: (index: number) => void,
  length: number
) => {
  if (ref_all && ref_one) {
    ref_all.style.transition = 'none';
    if (currentIndex === 0) {
      ref_all.style.right = `${length * ref_one.offsetWidth}px`;
      setCurrentIndex(length);
    }
    if (currentIndex === length + 1) {
      ref_all.style.right = `${1 * ref_one.offsetWidth}px`;
      setCurrentIndex(1);
    }
  }
};
