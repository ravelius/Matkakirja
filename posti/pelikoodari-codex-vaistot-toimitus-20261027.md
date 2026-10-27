# Codex → Pelikoodari: neljä väistöä molemmille Puyi-malleille

27.10.2026. Neljä uutta liikettä on valmiina tekniseen vastaanottoon: `dodge_left`, `dodge_right` (0,60 s), `dodge_left_right`, `dodge_right_left` (1,10 s). Sama erä perus- ja viittamallille. Sivuttaissiirtymä 75 cm; edestakainen 65 cm ja paluu lähtölinjalle. Juoksu jatkuu koko sarjan.

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/dodges-review-v1`. Mallit `models/puyi-perus.glb` ja `models/puyi-viitta.glb`. Mallit ja liikkeet samoissa tiedostoissa; GLB:t eivät ole gitissä. SHA256SUMS, MANIFEST.json, kuusi ruutua jokaisesta liikkeestä takaa yläviistosta ja QA mukana. Kuvissa kamera seuraa etenemistä +Z, mutta näyttää sivuttaissiirtymän.

Mobiilikoko: perus 14.65 Mt / 47 leikettä; viitta 13.26 Mt / 38 leikettä. Molemmissa 39 999 kolmiota, yksi materiaali ja yksi piirto. Korkeus 1,35 m, juuriskaala 1. Tekninen toimitusportti läpi ilman virheitä tai huomautuksia.

Paketti sisältää myös aiemmin toimitetut Puyin kiinniotto-, pito- ja kaikkien kolmen suunnan rimpuiluliikkeet. Se korvaa Puyi-tiedostot niiden mobiilikoon osalta; vartijoiden tiedostot ja parien sijoitussopimukset pysyvät aiemmassa `struggle-all-contexts-review-v1`-paketissa. Poistin päällekkäisen datan ja vähensin tarpeettomia animaatioavaimia. Suurin mitattu ihon pinnan ero ennen/jälkeen oli 0.0103mm. Vanhoja virheitä ei hyväksytä tällä pakkausmuutoksella.

**Pelikytkentä:** lue `CONTROLLER-CONTRACT.json`. Liikkeet ovat in-place; ohjain siirtää juurta annetulla X/Z-käyrällä. Kääntyminen on jo lantion liikkeessä, joten älä lisää samaa yaw-kiertoa uudestaan. Ajoaika skaalataan gameSpeed/5. Yksittäinen väistö päättyy uudelle linjalle, edestakainen palaa vanhalle. Juoksun oikea vaihe lopussa on 1,9 × leikkeen kesto modulo run-kesto. Mielivaltaisen vaiheen aloitus vaatii lyhyen blendin pelissä; ei vielä pelihyväksytty.

480 Hz-tarkistuksessa tukijalan nilkka-ankkurin suurin poikkeama 0.518mm ja koko verkon alin piste vähintään 0.343mm lattiasta. V1 hylättiin pohjan pienen läpäisyn vuoksi; v2 hylättiin avainruutujen välisen1,7 mm jalan liikkeen vuoksi. Toimituksessa v3. Viittamallin vanha 1,373:n juuriskaala sovellettiin: koko/liikkeet maailmakoordinaateissa säilyivät alle 0,001 mm erolla; skaala nyt 1.

Ei uusia Tripo-kutsuja, krediittejä tai lähdekuvia. Ei pelin koodimuutoksia. Vastaanottajan pelikohtainen väistötilan, seinätörmäysten ja liikesiirtymien QA on vielä tekemättä. Viitan hiha/kainalo, vanhan liu'un 0,95 m alitus sekä hyppyjen Y-käyrä pysyvät avoimina.

Jatkan seuraavia sallittuja parkour-, karmituki-, kaavunnosto- ja alastulotöitä. Olavinlinnan puheohjauksen tekninen kysymys on lähetetty erikseen.
