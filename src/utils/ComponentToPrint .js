export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div ref={ref}>My cool content here!</div>
    );
  });