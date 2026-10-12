# Päätoimittaja → Codex: Pulu raketin kyydissä, kasvot kulkusuuntaan (12.10.2026)

Omistaja 12.10.2026 klo 04.1x sanatarkasti: "Pyydä kodexilta lisää pulun kuvia jotta se istuu paremmin avaruusaluksen kyytiin kasvot sen kulkusuuntaan nähden, ei kameraan. Kaikki mitä tarvitset että näyttäisi luonnollisemmalta"

Generointilupa: omistajan viesti yllä kattaa tämän tilauksen, **8 kuvaa**. Yksi generointi per kuva, ei variantteja eikä vertailuottoja. Jos ensimmäinen ei läpäise tarkistusta, toimita paras ja kirjaa poikkeama.

## Tausta

ISS-raketin laukaisussa (Andøya → ISS) Pulu eli Livia-astronautti lentää alustalla raketin kylkeen ja ratsastaa koko nousun. Nyt se on yksi etukuva (sinun LiviaEva-piirroksesi `perus.png`, jossa lintu on pienenä kuvan kulmassa), joka käännetään aina kameraa kohti. Siksi Pulu tuijottaa katsojaa ja näyttää liimatulta tarralta. Tavoite: Pulu istuu luontevasti raketin kyljessä kuin ratsastaja, ja sen kasvot ja katse osoittavat raketin kulkusuuntaan eli kärkeä kohti.

## Viitteet (sama Mac, luettavissa)

`/Users/Shared/Claude/proto-3d/_tyo/codex-pulu-raketti-20261012/viite/`
- `livia-eva-perus.png` ja `livia-eva-perus-kasvot.png`: hahmon nykyinen piirros (304 × 608, lintu oikeassa alakulmassa). Hahmo, kypärä, puku, värit ja piirrostyyli pysyvät TÄSMÄLLEEN samoina.
- `peli-01b-alusta-pulu.png`, `peli-02-nousu.png`, `peli-03-maxq-pulu.png`, `peli-04-irtoaminen-pulu.png`, `peli-05b-tahdet-pulu.png`: pelikuvat nykyisestä toteutuksesta (iPhone pysty) eli tilanteet, joihin uudet kuvat tulevat.

## Asento ja suunta (koskee kaikkia)

- **Kulkusuunta on kuvassa AINA YLÖSPÄIN.** Peli kääntää kuvaa niin, että sen yläreuna osoittaa raketin kärkeen myös silloin, kun raketti kallistuu nousussa.
- Raketin runko on kuvan VASEMMALLA puolella pystysuorana pintana, mutta runkoa EI piirretä, koska peli piirtää raketin. Pulu painautuu vatsapuoleltaan vasemmalla olevaan runkoon ja pitää siitä kiinni siivillään ja jaloillaan kuin ratsastaja, joka nojaa hevosen kaulaan.
- Pää on ylhäällä ja visiiri suunnattu ylös kärkeä kohti. Katse kulkee ylöspäin pitkin runkoa, EI kameraan.
- Kaikissa kuvissa sama mittakaava: kypärän halkaisija on sama pikselimäärä (noin 300 px) ja koko hahmo mahtuu kuvaan marginaaleineen.

## Kuvat (8 kpl)

| tiedosto | kuvakulma | kuvaus |
|---|---|---|
| `pulu-raketti-pito-profiili.png` | sivulta (profiili) | Perusratsastus koko nousun ajan: vatsa vasemmalla olevaa runkoa vasten, siivet ja jalat otteessa, pää ylhäällä ja katse ylös kärkeen. Päättäväinen, vähän innostunut ilme. |
| `pulu-raketti-pito-34-edesta.png` | 3/4 edestä (kamera noin 35° kärjen puolella) | Sama asento. Visiiri ja kasvot näkyvät enemmän, mutta katse on silti ylös kulkusuuntaan. |
| `pulu-raketti-pito-34-takaa.png` | 3/4 takaa (kamera noin 35° pyrstön puolella) | Sama asento takaviistosta: kypärän takaosa, reppu ja pyrstösulat näkyvät. Peli käyttää tätä, kun kamera on raketin takana ja alla. |
| `pulu-raketti-maxq.png` | sivulta | Max-Q, suurin ilmanpaine: Pulu on painunut litteäksi runkoa vasten, pää hieman alhaalla, silmät sirrillä. Pään sulat ovat kypärän sisällä pöyhistyneet kiharoiksi (pelin repliikki vitsailee "permanentista"). |
| `pulu-raketti-irtoaminen.png` | sivulta | Ensimmäisen vaiheen irtoaminen ("Heippa, bensatankit!"): toinen siipi pitää kiinni, toinen vilkuttaa taakse ja alas putoavalle vaiheelle. Pää kääntyy olan yli taaksepäin, ilme iloinen. |
| `pulu-raketti-tahdet.png` | 3/4 edestä | Moottorit sammuneet ("Oi… tähtiä"): ote on rento, ja pää kallistuu katsomaan ylös sivulle tähtiin. Ihmettelevä, hiljainen ilme. |
| `pulu-raketti-laskeutuu.png` | sivulta | Lento raketin kylkeen ennen sytytystä: siivet levällään jarruttaen, jalat eteen kohti runkoa, pää ylhäällä. |
| `pulu-raketti-pito-profiili-yo.png` | sivulta | Sama kuin `pito-profiili`, mutta yöllä laukaisualustalla: lämmin valonheitinvalo alhaalta ja sivulta, muuten hämärä. Varjot tulevat piirrokseen eikä taustaan. |

## Tekninen

- PNG RGBA, straight alpha, sRGB, **1024 × 1024**, tausta täysin läpinäkyvä (alfa 0).
- Ei taustaa, ei rakettia, ei varjoa taustalla, ei tekstiä, logoja, lippuja eikä numeroita.
- Reunat terävät ja siistit ilman haloa, koska peli suurentaa kuvan iPadilla noin 300–400 px korkeaksi.
- Valaistus kuten `perus.png`:ssä (pehmeä valo vasemmalta ylhäältä). Poikkeuksena yökuva.

## Toimitus

1. Ensisijaisesti paikallisesti: `/Users/Shared/Claude/proto-3d/_tyo/codex-pulu-raketti-20261012/toimitus/`, samat tiedostonimet.
2. Kopio R2:een: `karttanostot/20261012/pulu-raketti/`.
3. Manifesti `posti/kuvatoimitus-pulu-raketti-20261012.json`, jossa jokaiselle kuvalle mitat, SHA-256 sekä
   - `kiinnityspiste_px` [x, y]: kohta, jossa vatsa ja kädet koskettavat runkoa,
   - `kypara_keskipiste_px` [x, y] ja `kypara_halkaisija_px`,
   - `katse`: sanallinen suunta.
4. Kuittaus `posti/codex-fable-pulu-raketti-20261012.md`.

Ei main-mergeä, versionnostoa eikä julkaisua. Linssiseppä 2 kytkee kuvat peliin: kuvakulman valinta kameran suunnan mukaan, peilaus tarvittaessa ja vaihe repliikkien mukaan.
