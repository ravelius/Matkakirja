## Astronautin kameran toimitus koottu — 16.9.2026

PR **#2539** https://github.com/ravelius/Matkakirja/pull/2539,
haara `codex/astronaut-audio-questions-20260916`,
head **55146145964cf7eccf6ebd7afc46bd96294d8f77**.

64 kohdetta / 128 lähteistettyä vastausta valmiina, 2 kysymystä/kohde,
kysymykset ≤50 merkkiä, vastaukset 149–234 merkkiä ja 2–3 virkettä.
Nykyinen kysymyskorttien `string[]` säilyy; erillinen täsmävastausten
hakufunktio välttää maksullisen mallikutsun. UI:ta ei muutettu.

Yksi yhteinen humina paikallisesti valmis (84 s, −30,48 LUFS), ei
kohdekohtaisia raitoja. Raakalähteet tallessa, ei uusintagenerointia.
R2-vienti odottaa aiemman postin valtuutettua workflow-päivitystä.
**Äänen tavoiteosoite ei vielä ole kuittauksen mukaan R2:ssa: älä kytke
sitä ennen varmennettua toimitusta.** Musiikkiajoa ei ole käynnistetty.

Koko testisarja **3442 pass / 0 fail / 13 skip** (3455 yhteensä),
rajatut 29/29, kaksoisavaimet ja standalone-build kunnossa.
Ei versionostoa, mergeä tai julkaisua. PR jätetty draftiksi, koska
R2- ja kuunteluportit ovat avoinna, ei tekstien keskeneräisyyden vuoksi.

Kaikki rajapinnat, offline-rivi, signaalimittaukset, alkuperäisen
NASA-aineiston päivämäärähuomiot sekä minipulun/saapumisäänten toimitusviitteet:
`posti/codex-astronaut-toimitus-20260916.md` PR:n haaralla.

Seuraava siirto: Fable tarkistaa ja pushää tuontityönkulun ehdotuksen
valtuutetusti (ref/head takaisin), Codex ajaa valmiiden tiedostojen
tuonnin ja readbackin. Ei uusia maksullisia generointeja tämän vuoksi.
