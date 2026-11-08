# Natiivi-UI: luovutus 8.11.2026 klo 12.35 (2.216 mitattu ja kiinteä ladonta KOE tehty; nähtävyysnapautus odottaa JU:n kuvia)

Korvaa luovutuksen -1120 (90b9e557d); sen jono 1–4, Opit ja PÄIVITYKSET ennallaan, lue ne:
`git show 90b9e557d:docs/raportit/viesti-natiivi-ui-luovutus-20261108-1120.md`.
PT local_5df52e10-10e4-4b72-9554-0049db300dfe, JU local_06f8c680-4618-42bd-a730-9b6a3e17e0b7, Postivahti local_afae44f0-722b-4541-a3b8-30ca4f76543b.
Proto-työkopio /Users/Shared/Claude/wt/proto-natiivi-ui-lahto-vahvistus, nyt haaralla natiivi-ui/kartta-lukittu-222 (puhdas, natiivi-backup).

## JONO
1. NÄHTÄVYYSNAPAUTUS ae84dd1dd (natiivi-ui/nahtavyyden-napautus-222): JU kääntää 12.20 (lokit/nui-nahtavyysnapautus-1-ae84dd1dd-kaannos).
   Kun kuvat tulevat: katso 8 kuvaa (ennen, lento, keskitetty, kierto puoliväli, palkki, palkista auki, suljettu, sormi) → kuvasarja PT:lle → KK.
   Ei koeversioon ilman omistajan sanaa. Osa 3 (nimet lukittuna kierron aikana) tulee kiinteän ladonnan kortin jälkeen.
2. 2.216 KIINTEÄ LADONTA (PT 12.22, rinnalla): KOE 9f4b590b5 natiivi-ui/kartta-lukittu-222 (= 50200fb68 + koe), push natiivi-backup.
   Todisteajo sk-kartta-lukittu-2.txt (proto-3d/_tyo/natiivi-ui/) JU:lla napautuksen jälkeen → lokit/nui-kartta-lukittu-2-9f4b590b5.
   KATSO: md5 kl2-p-pohjoisesta = kl2-p-lannesta = kl2-p-idasta = kl2-p-paluu (sama paikka kolmesta suunnasta + pieni panorointi);
   kl2-pieni-perilla: samat nimet samoissa kartan kohdissa kuin P:ssä (siirto vaiheen korrelaatiolla, ks. Työkalut); Concorde 15/16:
   `ui kohdenostot`-rivin "ruutu (x,y)" miinus merkin piste samalla puolella (−35 pt molemmilla); kl2-p-vanha = vanha ladonta vertailuksi.
   `ui kiintealadonta tila`: ladontoja-luku ei saa kasvaa P:ssä panoroinnista (vain taso/porras/aineisto) ja ms-aika talteen (laite).
   Jos md5 eroaa: ero.py (alla) näyttää kohdat → syy: aineiston saapuminen (avain muuttui, katso tila-rivit) vai puut/pallot/varjot.
   Sitten EHDOTUS + parit PT:lle → KK:n kortti (alla). Ei junaan ilman korttia.
3. ☰-valikkoselvitys (luovutus -1120, PÄIVITYS 11.4x AUKI).

## EHDOTUS KORTILLE (luonnos; yksi asia per kysymys)
Pääkysymys: "Kartan nimet lukitaan karttaan: paikka ja näkyvyys päätetään lähennystasoittain kartan mukaan, ei ruudun mukaan. Panoroidessa ja
pysähtyessä mikään nimi ei siirry eikä vaihdu; sama paikka ja sama lähennys näyttävät aina saman kartan; vain lähennys (taso) tuo tai vie nimiä.
Merkin pieni kuva pysyy samalla kyljellä tasolta toiselle."
Mitä muuttuu (todiste kuvina): Palais Bourbon / Kunnialegioona / République / Marseille eivät enää vaihda paikkaa reitin mukaan.
Huomiot omistajalle (erilliset kysymykset tarvittaessa):
- KIERTO JA KALLISTUS: nimet pysyvät vaakassa (omistaja 28.10. 08.39), joten kierrossa ja kallistuksessa ladonta vaihtuu 5° portain
  (kuten lähennyksessä tasoittain). Vaihtoehto "nimet kääntyvät kartan mukana kuin paperilla" olisi täysin lukittu, mutta kumoaisi 28.10. päätöksen.
- RUUDUN REUNA: nimi näkyy vain kokonaan (KK 6.11.), joten reunalla nimi syttyy/sammuu panoroidessa (ei siirry). Vaihtoehto: reuna leikkaa nimen kuin painetun kartan.
- UI:n ALLA: kiinteä nimi ei enää väistä yläpalkkia/Pulua/maakorttia, vaan jää niiden alle (UI peittää).
Tekninen sisältö: Assets/Matkakirja/Kartta/KiinteaLadonta.cs (puhdas, testit Kartta-testit/Testit/KiinteaLadontaTestit.cs),
Nimikerros.LadoKiintea (kanoninen taso: Mercator, suunta+kallistus portaina; avain = taso, portaat, piirros, linssi, rivit, esteet),
Nahtavyysalue.KiinteatEsteet (mallit + ohjelmakohteet), NostotKartalla.AsetaKuvanPaikka (kylkiPysyy), `ui kiintealadonta 1|0|tila`.

## AUKI KIINTEÄSSÄ LADONNASSA (ennen junaa)
- Esteinä vielä vain mallit ja ohjelmakohteet: kohdenostojen kyltit, pyöreät kuvat, kaupunkimerkit ja alueiden puut puuttuvat (ruutuesteet) →
  lisää karttapisteistä (NostotKartalla.Merkki.Lat/Lon + koko tason mittakaavassa). Nimi voi nyt jäädä pyöreän kuvan alle.
- Suurkaupungit, maailmanperintö ja sivupaikkanimet vanhalla ladonnalla (KiinteaRivi); kaukotasot erikseen.
- Kohdenostot itse (NostotKartalla.Sovita, 120 lähintä NostoKerros.cs:667–672, kyltin törmäyshäivytys) ovat yhä ruudun mukaan.
- Aineiston saapuminen (Laattapalvelin.ElavaNimetLahelta, Karsi 4000) muuttaa avainta → uusi ladonta voi pudottaa näkyvän nimen, jos
  saapuva voittaa sen (harvinaista, ruudun ulkopuolella). Tiukka ratkaisu: ladonta laattaruuduittain naapureineen (5×5).
- Mittari (TextMeshPro) mittaa kaikki ehdokkaat ensimmäisellä ladonnalla: ms-aika laitteelta (tila-rivi).
- Tuileries'n palatsi (PiirrosPeitot + vasen, KK 6.11. 07.42 puutarhan puoli): kuva siirtyy kyltin päähän kun kyltti näkyy (noin 8 pt), muut pysyvät.

## Työkalut (scratchpad katoaa, kopioi tarvittaessa)
- Siirto/ero/parit: /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/db85d138-c161-4e6b-9adc-95aa691a4214/scratchpad/{siirto,ero,pari}.py
  (numpy+PIL, aja ilman -I). Kopiot: proto-3d/_tyo/natiivi-ui/kartta-lukittu/.
- 2.216-mittaus: proto-3d/_tyo/natiivi-ui/kartta-lukittu/tulos-kartta-lukittu-1.md ja parit (lähetetty PT:lle 12.2x).

## Opit (uudet)
- `komento aja` takaisin samaan paikkaan ei aina osu samaan kameraan (lepo A vs C: 1–3 pt) → pikselivertailu vain paluu ilman zoomia välissä.
- Cesiumin suuntamuunnos: käytä pisteparia (TransformUnityPositionToEarthCenteredEarthFixed p ja p + d), suunnan API:a ei ole varmistettu.
- Object.GetInstanceID on Unity 6.7:ssä virhe (CS0619): käytä GetHashCode tai GetEntityId.

## PÄIVITYS 12.4x (JU 12.23)
- TOPOESITTELY 756f4962d iPad VALMIS: lokit/nui-topoesittely-1-756f4962d (7/7, eri md5, huippu 2236 Mt, NRE 0) + Mac-video /mac. EI VIELÄ KATSOTTU.
  Jono 1b (napautuksen rinnalla): katso video (kyltti perillä, NS:n kierto 9,6 s, tauko ▷, ruudukko) ja kuvat → video KK:lle PT:n kautta (luovutus -1120 PÄIVITYS 11.5x).
- JU:n järjestys: nähtävyysnapautus ae84dd1dd (käännös valmis) → lippu-442-2 → (jonoon) kartta-lukittu-2 9f4b590b5.
