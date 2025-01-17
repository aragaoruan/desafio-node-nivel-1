const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());


const repositories = [];

app.get("/repositories", (req, res) => {
  res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  res.json(repository);

});

app.put("/repositories/:id", (req, res) => {
  
  const { id } = req.params;
  
  const { title, url, techs } = req.body;
  
  const repositoryIndex = repositories.findIndex(repository => 
    repository.id === id  
  );

  if (repositoryIndex < 0) {
    return res.status(400).json({ error: 'Repository does not exists.' });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  };

  repositories[repositoryIndex] = repository

  return res.json(repository);

});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repository => 
    repository.id === id  
  );

  if (repositoryIndex < 0) {
    return res.status(400).json({ error: 'Repository does not exists.' });
  }

  repositories.splice(repositoryIndex, 1);

  res.status(204).send();

});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repository = repositories.find(repository => 
    repository.id === id  
  );

  if (!repository) {
    return res.status(400).json({ error: 'Repository does not exists.' });
  }

  repository.likes += 1;

  return res.json(repository);
  
});

module.exports = app;