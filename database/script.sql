DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS question;

CREATE TABLE question (
    question_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `statement` VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    title VARCHAR(127),
    difficulty INT(1),      -- 0~9
    hint VARCHAR(255),
    `time` INT(2)           -- seconds
);

CREATE TABLE tag (
    tag_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(31),
    question_id INTEGER NOT NULL,

    CONSTRAINT fk_tag_question FOREIGN KEY (question_id) REFERENCES question(question_id)
);
