
const shape = [
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  [
    [1, 0],
    [1, 1],
  ],
  [
    [0, 1],
    [1, 1],
  ],
  [
    [1],
    [1],
    [1],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 0],
  ],
  [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
  [
    [0, 1],
    [1, 1],
    [1, 0],
  ]
]

export const selectShape = () : number[][] => {
  const index = Math.floor(Math.random()*shape.length);
  const selectedShape = shape[index];
  return selectedShape;
}