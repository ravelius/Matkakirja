# Sisältökirjurin luovutus 21.10.2026 iltapäivä (Postivahti, PT: tilinvaihto/nollaus)

Rooli, checkout (/Users/Shared/Claude/Matkakirja-sisaltokirjuri), agenttisäännöt (vain Opus/Sonnet) ja osoitteet kuten edellisessä luovutuksessa
(docs/raportit/viesti-sisaltokirjuri-luovutus-20261018-yo.md). Viestit `send_message` `session_id`:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md); PT ≤ 3 riviä.

## Valmista (kaikki mainissa)
- Kaanaan häät -nimikorjaus (#4850): pariisi-museo-teksti, ranska-lahestyminen-tekstit, tarkistustaulukko. teosluettelo-v1.json (LS, repon ulkopuolella) korjattu paikallisesti.
- Euroopan 1. tason alueiden suomenkieliset nimet (#4852): docs/kohtaukset/alueiden-nimet/admin1-fi-eurooppa.json (154 aluetta iso_3166_2-avaimella + 22 regiota; riippumaton tarkistus).
- Suomalaiset lainausmerkit näyttöteksteihin (#4862, merge 5695053968): työkalu tools/suomalaiset-lainausmerkit.mjs (kuivaajo / --kirjoita; valkolista avaimista, lahde-kentät ja museotiedostot pois); astronaut-kysymykset generoidaan tools/astronaut/qa-*.json:sta.
- ISS-yötaivaan tekstit olivat jo valmiina (15.10.); ISS-skannerin kohdeluettelo (#4880 c0cf5354b: 1 190 kohdetta, 1 026 vailla tekstejä) ja B1-näyte 10:stä (#4881 c8930b6b6).

## Kesken
- B1 (ISS-skannerin tekstit: aloitus + luonne + 2–4 riviä, lähteet krediitteihin): SEIS omistajan päätöksellä 18.10. 16.15 ("ÄLÄ TEE HUOMISEN TÖITÄ"); PT katsoo näytteen ja rajat (aloitus ≤45, luonne ≤110, arvo ≤24; Sierra Leonen luonne 117 > 110) ja päättää erät. Järjestys PT:ltä: 1) 25 aluetta/nähtävyyttä + 86 vuoristoa, 2) 164 olemassa olevan uudistus, 3) 915 kaupunkia väkiluvun mukaan; nimivirheet (Shenyeng, "Ft.  Worth") korjataan kysymättä, duplikaatit maan nimellä; Sonnet-agentit rinnakkain, faktatarkistus pistokokein. Datan lähde: proto-3d/Matkakirja-proto/Assets/Matkakirja/UI/Resources/IssSkanneri (hakemisto.json, faktat.json, data.json).

## Opit
- Puheen välimuistiavain on persoona|säädöt|TEKSTI: tekstin merkkimuutos (esim. lainausmerkit) vaatii avainnormalisoinnin ennen tekstien vaihtoa (#4860).
- Esitarkistus: `git ls-files` + lekseri, ei regexiä koko tiedostoon; `+`-yhdistetyt literaalit käsiteltävä yhtenä tekstinä.
- Committoimaton: `.claude/settings.local.json.*`, `.wrangler/` (ei omia, jätä).
