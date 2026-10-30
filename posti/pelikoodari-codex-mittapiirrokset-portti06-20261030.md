# Pelikoodari → Codex: TILAUS mittatarkat viivapiirrokset, portti 06 Meridiaaniportti 午门 (30.10.2026)

Omistajan päätös 30.10. klo 09.11 (PT:n kautta): juoksupelille tehdään pohja- ja julkisivupiirrokset todellisin mitoin,
Meridiaaniportista alkaen. Peliin rakennetaan "matemaattisesti" oikea maailma, johon elementit ladotaan. Omistaja hyväksyy
julkisivun kortilla ennen 3D-työtä.

## Tilaus (2 piirrosta)
1. **Pohjapiirros ylhäältä**: `portti06-pohja-codex.svg` + `.png`
2. **Etelän julkisivu edestä** (ortografinen, katse pohjoiseen akselia pitkin): `portti06-julkisivu-etela-codex.svg` + `.png`

## Mittapohja (sitova)
Liitteet: `posti/pelikoodari-codex-mittapiirrokset-portti06-20261030/` (SHA256SUMS).
- `portti06-pohja.png` / `portti06-julkisivu-etela.png`: minun mittapohjani. Jokaisen osan paikka ja koko on piirretty metriruudukkoon.
- Saman nimiset `.json`: kuvan kehys (px/m, x0/x1, a0/a1, marginaalit). Toimita piirroksesi **täsmälleen samaan kehykseen**: sama
  kuvakoko, sama px/m ja sama ruudukko, niin että piirroksesi asettuu mittapohjan päälle pikselilleen. Vertailutyökalu tekee sen automaattisesti.
- `portti06-mitat.json`: kaikki mitat ja jokaisen lähde ([1]–[5]). **A** tarkoittaa arviota ilman lähdettä. Älä muuta mittoja. Jos jokin
  mitta on mielestäsi väärin, merkitse se erilliseen listaan lähteen kanssa.

## Mitä piirretään
- **Viivapiirros**, ei maalaus: muodot vektoreina mittapohjan ääriviivoihin, metriruudukko näkyvissä (1 m ohut, 10 m vahva), mittakaavajana
  ja pohjoisnuoli.
- **Havainnekuvan värit ja koristeet** (`havainne-06-meridiaaniportti.png`):
  - keltaiset tiilikatot tiiliriveineen ja harjakoristeineen;
  - turkoosi-sininen palkkivyö maalauksineen;
  - punaiset pylväät ja seinät;
  - harmaa kivisokkeli;
  - valkoiset marmorikaiteet.
- Koristeet vain mitattujen ääriviivojen sisään. Esimerkkejä: kattotiilien rivijako, räystäskannattimet, nimitaulu ja ovien kehykset.
- **Ei vapaasti maalattua** osaa, eikä mittapohjasta poikkeavia muotoja, korkeuksia tai leveyksiä.
- Muotomalli on minun sokkelopiirrokseni 20.10. (`muotomalli-sokkelopiirros-20261020.png`): selkeä otsikko, selite, mittakaava ja nimet.
  Tekstit suomeksi; kiinalaiset nimet saa olla.

## Huomioita mittapohjasta
- **Akselikehys:** pohja.json on kierretty 2,03°, jotta palatsin akseli on x = 0. Origo on Taihedianin keskellä, y = 0 on aukion taso.
- **Lähteistä varmistetut mitat:**
  - jalusta 12,00 m [1], leveys 126,9 m [3];
  - päälinna 60,05 × 25,00 m [1], kokonaiskorkeus 37,95 m [2];
  - siivet 13 jännettä [1];
  - paviljongeissa kaksinkertainen telttakatto 重檐攒尖 [1].
- **Etelän aukot:** etelästä näkyy 3 aukkoa (明三 [1]), ja ne ovat suorakulmaisia kehyksineen kuten havainteessa.
- **Kello- ja rumpupaviljongit 钟鼓亭** (3 jännettä [1]): koko ja paikka puuttuvat. Merkitse ne katkoviivalla "paikka avoin".

## Toimitus
`posti/codex-pelikoodari-mittapiirrokset-portti06-<pvm>/`: SVG + PNG kummastakin, SHA256SUMS ja lyhyt lista mahdollisista mittahuomioista.
Vastaanotto PK, joka ajaa automaattisen päällekkäisvertailun mittapohjaan ja peliin ja vie piirrokset PT:lle. Omistaja hyväksyy
julkisivun KK:n kortilla.

Seuraavaksi samalla tavalla tulevat Taihemen 太和门, Taihedian 太和殿 ja sivuhallit (mittapohjat tulevat erikseen).
