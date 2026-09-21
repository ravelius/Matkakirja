// Työkansio atlaslehden skannille ja välituloksille (ATLAS_KANSIO tai ~/pyramidi-poltto/atlas/).
import { homedir } from 'node:os';
export function kansio() {
  const k = process.env.ATLAS_KANSIO || `${homedir()}/pyramidi-poltto/atlas/`;
  return k.endsWith('/') ? k : `${k}/`;
}
