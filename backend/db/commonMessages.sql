SELECT *
FROM `message`
WHERE `conversationId` IN (
    -- Select conversation ids where userId `1` and `3` are participating
    SELECT `id`
    FROM `conversation`
    WHERE `userId` = 1
      AND `id` IN (
        SELECT `id`
        FROM `conversation`
        WHERE `userId` = 3
      )
  );