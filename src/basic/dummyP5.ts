const dummyP5 = new p5((p: p5) => {
  p.setup = () => {
    p.noCanvas();
  };
});

export default dummyP5;
