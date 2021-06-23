const fs = require("fs").promises;
const path = require("path");
const chapters = require("./chapters.json");

function removeIllegalCharacters(text) {
  return text.replace(/[<>:"/\\|?*]/g, " ").trim()
}

async function main() {
  const quizDir = path.join(__dirname, "quizzes")
  await fs.mkdir(quizDir);
  for (let index = 0; index < chapters.length; index++) {
    const chapter = chapters[index];
    const chapterDir = path.join(quizDir, removeIllegalCharacters(index + 1 + ". " + chapter.name));
    await fs.mkdir(chapterDir);
    for (let index = 0; index < chapter.topics.length; index++) {
      const topic = chapter.topics[index];
      const topicDir = path.join(chapterDir, removeIllegalCharacters(index + 1 + ". Postgres - " + topic + ".yaml"));
      await fs.writeFile(topicDir, `subject: Postgres\ntopic: ${topic}\nquestions:\n  - question: `);
    }
  }
}

main()