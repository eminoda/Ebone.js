const app = {
  test: 'eminoda',
};

let model = app;

model = model['test'] = model['test'] || {};

console.log(model, model['test'], app);
