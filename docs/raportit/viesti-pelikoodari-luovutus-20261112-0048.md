# Pelikoodari: luovutus 12.11.2026 klo 00.48 (konteksti 29 %, Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261111-2226.md (678bc471b). TÄMÄ KORVAA SEN KOKONAAN.

## 1. TYÖN ALLA: KAMERALAITE PALA 2, SYYN SELVITYS (KK:n PÄÄTÖS 00.47, sanatarkasti alla) — EI KORJAUSTA ENNEN RAPORTTIA
Koodi: haara kameralaite/pala-2 @ 2ec17d3fb (natiivi-backupissa), wt /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite.
Tehtävänanto + KK:n aiemmat päätökset: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kameralaite-pala2-tehtavananto.md
Tallenne (JU 00.42): /Users/Shared/Claude/proto-3d/lokit/pelikoodari-kameralaite-pala2-2ec17d3fb (unity.log, kamerarivit.txt, arkit/, patkat-uusi/LUE.txt;
videoaika = peliaika − 251,33; uuden jakso unity.log riviltä 8146). Oma tulos: proto-3d/_tyo/pelikoodari/kameralaite/TULOS-tallenne-pala2.md.
Löydös: uusi massassa 15+37+3 ruutua (mittari t 129,4 / 130,7 / 140,0 s), piilossa 26+79+54; porttitunneli + vasen z110/z118 avoimen juhlasalin
räystään (ala 3,5) alle; ohjaaja H 2,4, ahtaus 0,4–0,8, D 4,4. Vanha 0/0 mutta ERI SIEMEN (vanha 1942097695, uusi 1942463309), eri reitti.
Mittari-/kamerakoodi: JuoksuV4Maailma.cs ~2715–2760 (uusiOhjaa, seuranta.Kuva/Aloita/Mittaa, KameraMassassa, sokkeloMaailma.PelaajaPiilossa);
seuranta.Kartta(r.Kartta, KuljettavaR, LattiaR, VapaaKorkeusR, SeinaEtR). Testit: Linssit-testit/kaanna.sh Seurantaohjaaja | Kameralaite (16/16, 14/14).

KK 00.47 (tee juuri näin):
"Mittaa niin, että kaksi oletusta erottuvat toisistaan (linjan kohdat 3 ja 6):
A. Kartta ei tunne massaa: kyselyt sanovat vapaata (SeinaEt, VapaaKorkeus) pisteessä, jossa Massassa on tosi (räystäs, pylväs, katto). Silloin ohjaaja on sokea ja vika on ympäristörajapinnassa.
B. Kartta on oikeassa, mutta kamera menee sinne silti: jälki-ikkunan keskiarvo oikaisee kulman sisään noin 0,24 a = 0,6 m ja laite tulee viiveellä perässä, ja ahtaudessa 0,4–0,8 m se ylittää vapaan tilan; työntö on kiihtyvyyslisä eikä ehdi. Testi 5 oli 3 m:n käytävä, kapeaa käännöstä ei testattu.
Kirjaa ruuduittain t 128–132 s ja 139–141 s: s_kam, D, a, H, ahtaus; TAVOITEPAIKKA ja LAITTEEN PAIKKA erikseen, kummallekin SeinaEt, VapaaKorkeus, Massassa ja etäisyys jäljestä (oikaisu sisään); työnnön suuruus; ja mikä kappale peittää pelaajan (seinänkulma vai katto). Ratkaiseva kysymys: onko jo TAVOITE massassa vai vain LAITE.
Testi oikealla kartalla: toista tallennettu pelaajan jälki (noin t 120–135 s, 1/120 s) oikealla JuoksuKulkuKartalla ohjaajaan ja laitteeseen ilman peliä, niin että "massassa > 0" toistuu. Siitä tulee hyväksymistesti (massassa 0, seinästä ≥ 0,3 m). Laske lisäksi, montako vastaavaa kapeaa käännöstä kartassa on (leveys alle 2 m, käännös yli 60°).
Korjaus linjan sisällä: ei paikan asettamista eikä hakuja; jos sääntöä pitää muuttaa (esim. a ahtauden mukaan), tuo mittaus ja ehdotus minulle.
Uusinta samalla siemenellä 1942463309 vanhalle ja uudelle, kuten tilaus vaati; katson arkit ja kuusi kohtaa siitä ajosta."
Käytännön huomiot: ruutuloki vaatii Mac-ajon (JU) tai saman tilan toiston; siemen: `ui juoksupeli alku <siemen>` (JuoksupeliNakyma.cs:17).
Ruutulokin voi lisätä kameralaite-haaraan diagnostiikkana (mittari päällä vain komennolla). Raportti KK:lle, PT kopiona ≤ 3 riviä. Ei junaan.

## 2. KUVAJONO: VALMIS, JUNAEHDOKAS PT:llä
KK 00.30: 6e47d988f (haara pelikoodari/kuvajono, natiivi-backup, juna-224 dfd9388a5:n päällä) JUNAAN sellaisenaan; PT:lle lähetetty noin 00.35.
Ei kolmatta paikkaa; verkkohaku pysyy paikan sisällä. Näyttö: proto-3d/_tyo/pelikoodari/kohdekartta-kuvahaut/TULOS-kuvajono.md (KK:n korjaukset kirjattu).
SEURAAVAAN SOPIVAAN Kuvat.cs-muutokseen (KK): "ui kuva hidas" -riville vuoro ja paikka myös ruutuina (Time.frameCount). Ei omaa ajoa.
Kohta 3 (suljetun näkymän haun peruutus) jätetty: yli 30 riviä, koskee NUI:n Aloitusvihjeet.cs; ei tilattu.
Käynnistyksen ruutuajat (2 kehystä 9,4 s:ssa) = PT:n rivi Tekniseen kuntoon (lähetetty 22.35), ei Pelikoodarin.
Wt /Users/Shared/Claude/wt/proto-pelikoodari-kuvajono: poista (git worktree remove) kun 6e47d988f on junassa.

## 3. MUUT
- v133c 漱芳斋-ovi: PT:n pt-ok → MR (PT pyytää). Haara pelikoodari/tausta-v133 904715425 pushattu; wt poistettu.
- B1 bcf32314c (pelikoodari/seinat-taso1, pushattu): junaan vain PT:n päätöksellä. LAV:n aja-a2.zsh (JU) → vertaa m1-varmistus-kuviin (seinat-taso1/m1-varmistus jäi levylle).
- NAS-siirto tehty (PT 12.11.): _tyo/pelikoodari 16 kansiota → Matkakirja-arkisto/pelikoodari/_tyo-20261111/.
- Huom: tyokalut/tarkista.sh päivittää tyylikirjan → palauta git checkoutilla, älä committaa.
Ei agentteja käynnissä. Ei uusia lupia.

## LISÄYS 00.5x (NUI tiedoksi, ei toimia)
Puhe.cs 27d162d64 (natiivi-backup natiivi-ui/pariisi-tekstit): esikatselusääntö LataaJaSoitaTiedosto-silmukkaan (vain editori + MATKAKIRJA_ESIKATSELU_SK). Laitteen kulku ennallaan; älä tee päällekkäistä Puhe.cs-muutosta.
