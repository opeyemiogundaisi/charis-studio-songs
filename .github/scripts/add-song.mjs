// Takes the song from an approved issue (written by the share form) and adds it to
// packs/community-<language>.json, then updates packs/index.json.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const body = process.env.ISSUE_BODY || ''
const m = body.match(/<!-- song-json:([A-Za-z0-9+/=]+) -->/)
if (!m) { console.error('No song data in this issue'); process.exit(1) }
const song = JSON.parse(Buffer.from(m[1], 'base64').toString('utf8'))
const LANGS = { english: 'English', yoruba: 'Yorùbá', igbo: 'Igbo', hausa: 'Hausa', other: 'Other languages' }
const lang = LANGS[song.language] ? song.language : 'other'
const id = 'community-' + lang
const file = id + '.json'
const path = 'packs/' + file

const pack = existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : { pack: id, name: 'Shared by churches (' + LANGS[lang] + ')', version: 0, songs: [] }
const title = String(song.title || '').trim()
if (!title) { console.error('No title'); process.exit(1) }
if (pack.songs.some((s) => s.title.toLowerCase() === title.toLowerCase())) { console.log('Already in the pack: ' + title); process.exit(0) }
pack.songs.push({ title, author: song.author || '', copyright: song.copyright || '', source: 'Shared by ' + (song.by || 'a church') + ' (#' + process.env.ISSUE_NUMBER + ')', sections: song.sections })
pack.songs.sort((a, b) => a.title.localeCompare(b.title))
pack.version = (pack.version || 0) + 1
writeFileSync(path, JSON.stringify(pack, null, 1) + '\n')

const index = JSON.parse(readFileSync('packs/index.json', 'utf8'))
const entry = index.packs.find((p) => p.id === id)
const info = { id, name: pack.name, language: LANGS[lang], description: 'Songs shared by churches using Charis Studio, checked before publishing.', count: pack.songs.length, version: pack.version, file }
if (entry) Object.assign(entry, info); else index.packs.push(info)
writeFileSync('packs/index.json', JSON.stringify(index, null, 2) + '\n')
console.log('Added "' + title + '" to ' + path)
