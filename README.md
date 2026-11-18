# Charis Studio song packs

Free, ready-to-use song collections for [Charis Studio](https://studio.charislight.com).
In Charis Studio: **Library → Import → Song packs…** and click **Add**.

Every song here is in the **public domain** (its writers and translators died more than 70 years ago), or was shared by its writer with permission, so any church can use it.

## Share a song

You don't need GitHub. In Charis Studio, open a song and choose **Share with other churches**, or use the form at https://studio.charislight.com/share-a-song. Each song is checked before it is published.

## For maintainers

- `packs/index.json`: the list of packs the app shows.
- `packs/*.json`: the songs: `{ title, author, year, source, sections: [{ label, lines }] }`.
- Shared songs arrive as issues labelled `song`. Read the song, check the copyright, then add the label **`approved`**: a workflow adds it to `packs/community-<language>.json` and closes the issue. To decline, close the issue.

Maintained by Charis Light Media Concept Ltd.
