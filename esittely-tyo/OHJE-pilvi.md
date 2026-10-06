# Pilvisessio: loppujen 31 kaupungin esittelytekstit

Omistaja avaa claude.ai/codessa uuden session repoon **ravelius/Matkakirja** ja liittää alla olevan viestin
sellaisenaan. Sessio tekee tekstit; ääniä se EI tee (ne tehdään omistajan määräluvalla Macilla).

---

**KOPIOITAVA ALOITUSVIESTI:**

> Teet Matkakirja-pelin esigeneroidun oppaan kerrontatekstit 31 kaupungille. Aja `git fetch origin pelikoodari-esittely-pilvi && git checkout pelikoodari-esittely-pilvi`. Lue `CLAUDE.md`, `esittely-tyo/OHJE-kirjoittaja.md` ja `esittely-tyo/OHJE-tarkistaja.md` kokonaan sekä laatumalli `esittely-tyo/malli/praha.json`.
> Kaupungit ovat kansiossa `esittely-tyo/pohja/` (31 tiedostoa). Tee jokaiselle kaupungille kaksi vaihetta, kumpikin omalla ali-agentillaan, **aina mallilla opus** (ei koskaan muuta mallia):
> 1. KIRJOITTAJA (`OHJE-kirjoittaja.md`) → `esittely-tyo/luonnos/<id>.json` + `<id>-huomiot.md`.
> 2. TARKISTAJA (`OHJE-tarkistaja.md`, eri agentti kuin kirjoittaja) → `esittely-tyo/korjattu/<id>.json` + `<id>-muutokset.md`.
> Kumpikin ajaa lopuksi `node tools/opas/tarkista-esittely.mjs esittely-tyo/pohja/<id>.json <tiedosto>` ja korjaa, kunnes virheitä on 0. Saat ajaa enintään 4 kaupunkia rinnakkain.
> Committaa jokaisen valmiin kaupungin (luonnos + korjattu) heti erikseen ja pushaa haaraan `pelikoodari-esittely-pilvi` (commit-viestin loppuun `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`). Älä muokkaa muita tiedostoja, älä mergeä mainiin äläkä tee ääniä.
> Lopuksi kirjoita `esittely-tyo/PILVI-RAPORTTI.md`: kaupungit, kohteiden määrät, tarkistimen tulos, jäljelle jääneet epävarmuudet ja isoisä-maininnat lähderiveineen. Kerro valmistuessa, montako kaupunkia on valmiina.

---

Kun sessio on valmis, Pelikoodari ajaa koneellisen tarkistuksen uudelleen Macilla, koostaa tekstit Päätoimittajalle
(`tools/opas/koosta-esittely.mjs`) ja vie ne pakettina ämpäriin. Äänet tehdään vasta omistajan määräluvalla
(arvio noin 316 000 merkkiä ≈ 158 000 ElevenLabs-krediittiä: 397 kohdetta + 247 kierrosversiota).
