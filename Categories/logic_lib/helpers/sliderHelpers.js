function sliceHelper(rawData, pointer, categoryWidth, visibleLength) {
  const length = rawData.length;
  const rightBorder = pointer + categoryWidth;
  let array;
  let last;
  if (length <= visibleLength) { // tiny array
    array = rawData.slice();
    array.unshift(rawData[0]);
    return array;
  } else if (length > visibleLength && length <= categoryWidth) { // small array
    const firstPartSmall = rawData.slice(pointer);
    const secondPartSmall = rawData.slice(0, pointer);
    array = firstPartSmall.concat(secondPartSmall);
    last = array[array.length - 1];
    array.unshift(last);
    if (length < categoryWidth) {
      array.push(array[1]);
    }
    return array;
  } else if ((rightBorder > length) && length > categoryWidth) { // big array, window out of array range
    const firstPart = rawData.slice(pointer);
    const secondPart = rawData.slice(0, rightBorder - length);
    array = firstPart.concat(secondPart);
    array.unshift(rawData[pointer - 1]);
    return array;
  }
  array = rawData.slice(pointer, rightBorder); // big array
  let prev = (pointer === 0) ? rawData[length - 1] : rawData[pointer - 1];
  array.unshift(prev);
  return array;
}

function arrowHelper(flag, pointer, step, length) {
  let newPointer;

  if (flag === '>') {
    newPointer = pointer + step;
  } else {
    newPointer = pointer - step;
  }

  if (newPointer > length) {
    newPointer -= length;
  } else if (newPointer < 0) {
    newPointer += length;
  }
  return newPointer;
}

const touchMixin = {
  setInitialTouchState() {
    this.setState({
      left: 0,
      originalOffset: 0,
      velocity: 0,
      timeOfLastDragEvent: 0,
      touchStartX: 0,
      prevTouchX: 0,
      beingTouched: false,
      height: 0,
      intervalId: null,
      start: false,
      startShift: 0,
    });
  },

  handleStart(clientX) {
    if (this.state.intervalId !== null) {
      window.clearInterval(this.state.intervalId);
    }
    this.setState({
      originalOffset: this.state.left,
      velocity: 0,
      timeOfLastDragEvent: Date.now(),
      touchStartX: clientX,
      beingTouched: true,
      intervalId: null,
      start: true,
      startShift: 0,
    });
  },

  handleMove(clientX) {
    if (this.state.autoSliding) {
      this.props.stopAutoSliding();
    }
    if (this.state.beingTouched) {
      const touchX = clientX;
      const currTime = Date.now();
      const elapsed = currTime - this.state.timeOfLastDragEvent;
      const velocity = 20 * (touchX - this.state.prevTouchX) / elapsed;
      let deltaX = touchX - this.state.touchStartX + this.state.originalOffset;
      let { touchStartX, newDeltaX } = this.checkBorder(deltaX);
      deltaX = newDeltaX;
      this.setState({
        left: deltaX,
        velocity,
        timeOfLastDragEvent: currTime,
        prevTouchX: touchX,
        touchStartX,
        start: false,
      });
    }
  },

  checkBorder(deltaX) {
    const itemWidth = this.sliderItems[0].clientWidth;
    let touchStartX = this.state.touchStartX;
    let newDeltaX = deltaX;
    if (deltaX > 0 && deltaX > itemWidth) {
      this.arrowHandler('<');
      touchStartX += itemWidth;
      newDeltaX = 0;
    } else if (deltaX < 0 && Math.abs(deltaX) > itemWidth) {
      touchStartX -= itemWidth;
      newDeltaX = 0;
      this.arrowHandler('>');
    }
    return { touchStartX, newDeltaX };
  },

  handleEnd() {
    this.setState({
      velocity: this.state.velocity,
      touchStartX: 0,
      beingTouched: false,
      intervalId: window.setInterval(this.animateSliding.bind(this), 33),
    });
  },

  animateSliding() {
    let { left, velocity, beingTouched } = this.state;
    if (!beingTouched) {
      const excess = 5;
      let module = Math.abs(velocity);
      const sign = Math.sign(velocity);
      if (module > excess) {
        module -= excess;
        velocity = sign * module;
        left += velocity;
        let { touchStartX, newDeltaX } = this.checkBorder(left);
        left = newDeltaX;

        this.setState({ left, velocity, touchStartX });
      } else {
        window.clearInterval(this.state.intervalId);
        this.setState({ velocity: 0, intervalId: null, originalOffset: 0 });
      }
    }
  },

  clearInterval() {
    if (this.state.intervalId) {
      window.clearInterval(this.state.intervalId);
    }
  },

  launchAutoSliding() {
    this.setState({
      velocity: -1,
      touchStartX: 0,
      beingTouched: false,
      intervalId: window.setInterval(this.animateAutoSliding.bind(this), 33),
    });
  },

  animateAutoSliding() {
    let { left, velocity, autoSliding } = this.state;
    if (autoSliding) {
      left += velocity;
      if (typeof this.sliderItems[0] !== 'undefined' && typeof this.state.touchStartX !== 'undefined') {
        let { touchStartX, newDeltaX } = this.checkBorder(left);
        left = newDeltaX;
        this.setState({ left, touchStartX });
      }
    } else {
      window.clearInterval(this.state.intervalId);
      this.setState({ velocity: 0, intervalId: null });
    }
  },

};

function checkFirstItem(dataLength, categoryId, activeId, index, visibleLength) { // to avoid to show multiple opened categories
  if (dataLength > visibleLength) {
    return activeId === categoryId;
  }
  return (activeId === categoryId) && index !== 0;
}

export { sliceHelper, arrowHelper, touchMixin, checkFirstItem };
