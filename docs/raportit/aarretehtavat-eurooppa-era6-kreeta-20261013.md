# Aarretehtävät Eurooppa: erä 6 (Kreeta), 13.10.2026

Viimeinen puuttuva Euroopan kaupunki (suunnitelma `aarretehtavat-eurooppa-suunnitelma-20261012.md`: Kreeta = Katso + Vanha kartta*). Lajit ja palkkiot kuten erässä 3. Sisältö koneluettavana: `aarretehtavat-eurooppa-era6-kreeta-20261013.json`; faktaliite: `aarretehtavat-eurooppa-era6-kreeta-faktat-20261013.md`. 2 tehtävää + 1 maa-vihje (GRC).

| Kaupunki · henkilö | a) Katso ja löydä | b) Toinen tehtävä |
|---|---|---|
| **Kreeta** · Kalastaja Manolis, Heraklionin venetsialaisen sataman laiturilla (kotoisin Haniasta) | Pyhän Menaksen katedraali, Agios Minas (779 m, 25 £) | Kartta (Vanha kartta) (35 £): Hanian vanha merikartta, venetsialaisten kaleeritelakka |

Vanha kartta: Commons `Chania Crete Greece 1848.jpg` (UK Admiralty, Public domain, 1920 × 1449 px), oikea piste [1355, 670], toleranssi 55 px. Pisteen paikka tarkistettu katsomalla kuvaa (ympyrä kattaa koko rampiston; toinen "Slips" kartan koillisessa on noin 270 px päässä).

## Maan aarrevihje

| Maa | Paikka | Rivejä |
|---|---|---|
| GRC | Antikythera (saari Kreetan ja mantereen välissä; kaupunki null) | 3 |

GRC:llä on paikallisaarrepari (`paikallisaarteet.js`: pieni Hymettoksen hunaja, iso Antikytheran koneen osa), eikä yhdessäkään aiemmassa erässä ole GRC-vihjettä (Ateenan pilotti ei sisällä sellaista), joten rivit on kirjoitettu tähän. GRC:llä on nyt 4 tehtävää (Ateena 2 + Kreeta 2), joten kolmas rivi nimeää paikan.

## PT:lle huomioita

1. **Katso-kohde on Heraklionissa, ei Haniassa:** `tools/pollo/sallitut.js` sallii Kreetalla 3D:n vain Heraklionin keskustan ympäriltä (35,31443 N, 25,13487 E, r = 15 km), ja Hania on noin 103 km länsipuolella, joten Hanian majakka, satama tai halli eivät kelpaisi Katso-kohteeksi. Kohde on siksi Pyhän Menaksen katedraali (Agios Minas, Heraklionin vanhakaupunki), ja saapumispiste on venetsialaisen sataman laituri. Hanian kartta (b) sopii silti, koska hahmo on kotoisin Haniasta ja Kreetan oma fokusvirta sijoittuu Haniaan (Falassarna, Hanian majakka). Jos halutaan Heraklionin kartta, Commonsissa on vain amiraliteetin 1897-merikartta (`Heraklion 1897.jpg` / `Admiralty Chart No 1904 ... 1897.jpg`), jonka tekstit ovat 1920 px:ssä liian pieniä peliin; Hanian kartta on selvästi parempi.
2. **Muistomerkki-liput (Kreikan piilotuslista):** **PT 13.10.: a = `muistomerkki: true` (Pyhän Menaksen katedraali; nollariski Kreikan App Storessa), b = `false` (Hanian 1848 merikartta, PD).** Alkuperäinen kirjoittajan arvio: molemmat `false`. Katedraali on Kreetan kirkon omistama, 1862-1895 rakennettu kirkko (ei antiikin eikä valtion omistama muinaismuistomerkki), ja b on vanha karttakuva ja teksti. Vältetyt kohteet: Knossos ja muut minolaiset kohteet, Koules ja Heraklionin muurit, Hanian majakka, Neoria, Firkas ja moskeija (valtion suojaamia muistomerkkejä). Neoria mainitaan vain tekstissä (b.tiesitko) ja näkyy vain 1800-luvun merikartan piirroksena; laki koskee kuvia, ei tekstiä (PT 12.10.). Jos PT haluaa nollariskin kartan Neoria-aiheelle, aseta `b.muistomerkki` true (kartan aiheena kaleeritelakka). Saapumispisteen paikka (venetsialainen satama) ei näy kuvana.
3. **Hahmo:** Kreetan fokusvirta on kevyt pakki (ei kohtaamista), joten kohtaamishahmoa ei ole; Manolis on arkinen kalastaja (ei historiallinen henkilö, ei tunnista Horatiota). Saapumispiste on arvio venetsialaisen sataman OSM-koordinaatista; Linssiseppä tarkistaa 3D:ssä, että laiturilta näkyy kohti lounasta (kaupungin katot) ja että kupolikirkko ja kaksi kellotornia tunnistuvat 3D-mallista.
4. **Vanha kartta:** Commonsin skannauksessa on keltainen merkintä majakan kohdalla, joten majakkaa ei kysytä; kysymys koskee venetsialaisten kaleeritelakkaa, jonka vihje_vaarin neuvoo etsimään karttatekstin "Venetian Galleys". Kartta on päivätty Commonsissa 1848, mutta kuvassa on 1878-lisäyksiä, joten kysymyksessä sanotaan vain "vanha brittiläinen merikartta".
5. **Etsi kartalta ei ole mahdollinen:** `KAUPUNKIKARTAT` ei sisällä Kreetaa (vain Iraklion maakartan kaupunkilistalla), joten a on Katso.
6. **Maa-vihje GRC:** 1873-äänen ongelma: Antikytheran hylky löytyi 1900 ja kone tunnistettiin 1901-02. Rivit on kirjoitettu arvoitusmuotoon ilman väitettä, että isoisä tietäisi löydöstä (kuten mallierän Caravaggio-vihje), mutta PT päättää kelpaako. Ei Kolme veljestä -paljastusta. Paikka (35,8667 N, 23,3 E) on saaren keskikohta, ei pelikaupunki.
7. **Kuuntele-liitettä ei ole** (ei tarvita). Palkkiot (25 + 35 £) vastaavat erää 3. Kartta-tehtävä kuuluu Pelikoodarin moottorilaajennukseen (Vanha kartta); Linssiseppä tekee Katso-tunnisteen.
