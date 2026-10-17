// SUOMI AINA PAKOTETTUNA (omistaja 6.10.2026 ja 17.10.2026 klo 23.04: "pidä huoli että jatkossa aina suomi pakotettuna").
// Jokainen ElevenLabsin puhekutsu (text-to-speech, text-to-dialogue, with-timestamps) liittää runkoonsa `...kieliFi(malli)`.
// Ilman kielikoodia vieraat nimet (esim. "Louvre") vievät lukijan ranskaan ja suomi äännetään vieraalla aksentilla.
// Kielikoodia tukematon malli (eleven_multilingual_v2) on VIRHE, ei poikkeus: sillä ei generoida puhetta.
export const KIELI = 'fi';

/** Palauttaa pyynnön runkoon liitettävän `{ language_code: 'fi' }`; heittää, jos malli ei tue kielikoodia. */
export function kieliFi(malli) {
  if (/multilingual/i.test(String(malli ?? ''))) {
    throw new Error(`malli ${malli} ei tue language_code-kenttää; suomi pitää pakottaa → käytä eleven_v4_turbo, eleven_v4 tai eleven_v3`);
  }
  return { language_code: KIELI };
}
