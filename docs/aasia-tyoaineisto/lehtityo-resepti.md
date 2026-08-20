# Lehtityön yhteisresepti (Fablen agentit, 20.8.2026)

Tämä on kaikkien lehtikirjoittaja-agenttien yhteinen ohje. Kaupunkikohtainen
speksi täydentää tätä; ristiriidassa speksi voittaa.

## Roolit ja rajat
- Työskentelet git-worktreessä. ÄLÄ KOSKAAN käytä git stashia. Lopuksi
  YKSI commit, EI pushia. Raportoi worktree-polku + commit-hash.
- EI kosketa: js/tyohuone-raamattu.js, docs/tarina.md,
  docs/isoisan-raamattu.md, js/tyohuone-tilanne.js.
- EI versionostoa, EI uusia sivu-id:itä (vakiot js/ui-apurit.js
  AIHE_IKONIT), EI API-avaimia repoon/lokiin.
- Mallit luetaan repossa olevista tuoreista lohkoista: kulttuuri-
  kategoriat.js (medina, petra), maakartat.js (medina), nahtavyysjutut.js
  (medina), saatiedot.js (medina). Jäljittele talon tyyliä: pitkät
  lohkokommentit (mitä tarkistettiin, mistä, mitkä ristiriidat),
  merkkijonorivitys + '' -jatkoilla.

## Faktakuri
- JOKAINEN tekstiin menevä väite tarkistetaan en-Wikipedian
  raakatekstistä: NODE_USE_ENV_PROXY=1,
  https://en.wikipedia.org/w/index.php?title=X&action=raw
  Pelkkä #REDIRECT-rivi = väärä sivu, seuraa ohjaus. Verkkokutsuihin
  uusintayritys 6 krt kasvavalla viiveellä (katkokset ovat normi).
- Wikipedian sisäiset ristiriidat KIRJOITETAAN AUKI lukijalle tai
  valitaan tarkempi lähde ja ero selitetään lohkokommentissa
  (ennakkotapaukset v925, v932, v937: koordinaatit voittavat
  leipätekstin etäisyysarviot).
- Sisältölinjaus: ei nykysotaa, ei nykypolitiikkaa; uskonto
  historiallis-kulttuurisena ilmiönä, kunnioittava sävy; väkivalta
  vain neutraalina historiana ilman yksityiskohtien korostusta.
- Kulttuurivisa (middleeast-questions.js): lue kaupungin kysymykset —
  vastausten pitää löytyä lehden teksteistä; minitehtävä EI saa
  toistaa visaa ja sen vastaus on SAMALLA sivulla.

## Kuvasäännöt (SITOVAT — jos speksi ei anna valmista kuvalistaa,
   teet kuvatyön itse näin)
- Haku Commonsista (api.php, srnamespace=6), lisenssi AINA
  rajapinnasta (extmetadata: LicenseShortName, Artist, Restrictions).
  Sallitut: PD / CC0 / CC BY / CC BY-SA (myös 2.0/2.5/3.0 igo).
  KIELLETYT: NC, ND, Fair use. Leveys ≥ 1200 px.
- YKSI peräkkäinen kuvajono — ei rinnakkaisia hakuja (429).
- JOKAINEN valittu kuva KATSOTAAN SILMIN (lataa 900 px esikatselu ja
  lue se Read-työkalulla). Hylkää: tunnistettavat ihmiset (kasvot
  luettavissa — kaukaiset pisteet ja selin olevat kelpaavat);
  MIKÄ TAHANSA kuvan päälle lisätty merkintä (vesileima, vanhan
  studion signeeraus, arkistoleima, lisätyt kehykset/palkit) —
  poikkeus: julkaisijan oma litera/nuoli/karttanumerointi, joka
  selitetään kuvatekstissä; mainos- tai pakkauskuvat; alle 1200 px.
- Kirjaa raporttiin jokaisesta valitusta kuvasta MITÄ SIINÄ NÄKYY
  omin sanoin (Fable pistokoetarkistaa otoksen) ja jokainen hylkäys
  syineen.
- Jos nykykuvat eivät kelpaa: 1800-luvun PD-aineisto (litografiat,
  kaiverrukset, vanhat kartat, Matson-, Rijksmuseum-, LoC- ja
  BL-kokoelmat) on paras varanto.
- Lähderivi täsmälleen: 'Tekijä, Wikimedia Commons (LISENSSI)' —
  tekijä TÄSMÄLLEEN extmetadata.Artist-muodossa, '(PD)' ei
  '(public domain)'.
- Yksi tiedostonimi esiintyy kaupungissa vain kerran; aihetoisto
  (sama kohde kahdessa kuvassa) sallittu vain perustellusti ja
  raporttiin kirjattuna.

## Mitat (mittaa koneellisesti ennen committia, taulukko raporttiin)
- johdannot 154–232 mrk; nostot 440–660 mrk; nostoja 4 per sivu.
- kaupunkilehti: sivu `kaupunki` (johdanto, kansikuvat 3,
  avauskuvat 3, nostot 4, matkailijalle { kuva, kappale, artikkeli
  { nimi 'Matkailijan X', taitto 'opas', teksti, nosto, jaksot 5 } })
  + teemasivu (johdanto, tehtava, nostot 4).
- ALUELEHTI (Kappadokia/Siinai-malli): EI kohdekarttaa, EI
  nähtävyysjuttuja — kaksi sivua + opas samoin mitoin.
- Jaksokuvat: jakso saa olla kuvaton (Tukholma-ennakkotapaus), mutta
  enintään kaksi viidestä.
- Säärivin luonnehdinta kirjoitetaan RIVIN OMISTA LUVUISTA; jos
  mittauspiste vaatii selityksen (vuoristo vs. rannikko, ERA5-ruutu),
  se kerrotaan sekä kommentissa että oppaan sääjaksossa
  (Siinai/Petra-ennakkotapaus).

## Ennen raporttia
- node --test tests/*.test.mjs → LUE '# tests/# pass/# fail' -rivit
  itse (putki ei kaadu failiin) — fail 0 vaaditaan.
- node tools/tarkista-kaksoisavaimet.mjs → ei kaksoisavaimia.
- node --check muokatuille tiedostoille.
- Raportti lopputekstinä: worktree, haara, hash, mittataulukko,
  testirivit, faktapoikkeamat ratkaisuineen, kuvahylkäykset syineen,
  poisjätöt perusteluineen. Ei tervehdyksiä.
## LINJAUSMUUTOS 20.8.2026 (omistaja): tuhoutuneen kaupungin nykykuvat
Sodassa tai katastrofissa vaurioituneesta kaupungista näytetään MYÖS
tuoreita kuvia, vaikka niissä näkyy vaurioita tai jälleenrakennusta —
ja lehti KERTOO LUKIJALLE SELKEÄSTI mistä nykyilme johtuu, ettei
pelaaja jää ihmettelemään miksi kuvat ovat vanhoja. Tuho kerrotaan
tapahtumana neutraalisti, ilman julmuuksien yksityiskohtia ja ilman
osapuolikehystä; kuvateksti sanoo mitä kuvassa näkyy (rauniot,
työmaa, uusi rakennus). Edelleen EI taistelukuvia eikä uhreja.
Tämä KORVAA aiemman "kuvat eivät saa näyttää tuhoja" -käytännön.

## LINJAUSTARKENNUS 20.8.2026 (omistaja): matkaopas on nykytietoa
- Matkailijalle-osion ja matkaoppaan KUVAT OVAT TUOREITA — historialliset
  kuvat kuuluvat historia- ja nosto-osioihin, eivät oppaaseen.
- Matkailijalle-kuvaksi ei liian korkeaa pystykuvaa (venyttää palstan;
  vaaka tai maltillinen pysty).
- Opas sanoo SUORAAN jos matkustaminen kohteeseen on nykyisin
  vaarallista tai rajoitettua — asiallisesti, lyhyesti, ilman
  pelottelua (esim. Jemen, Syyria: ulkoministeriöiden matkustus-
  varoitustaso saa näkyä yleisellä tasolla ilman viranomaisviittausta:
  "matkailu maahan ei ole tällä hetkellä turvallista").
Nämä ovat Raamatussa (Kuvat ja lähteet).
