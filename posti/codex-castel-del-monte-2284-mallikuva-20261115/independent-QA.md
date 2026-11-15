# Castel del Monte #2284: riippumaton kuva-QA

**Verdict: FAIL — kahdeksan kulmatornin vaatimus ei varmistu, kuvasta erottuu seitsemän.** Luettu source-order.md, source-update.md sekä molemmat lähdeliitteet; katsottu lähdekoonti ja castel-del-monte-model-v1.png. Ei hakuja, renderiä, generointia tai checkpoint-muutoksia. Yksi sallittu generointi on jo käytetty; tässä ei käynnistetä uusintaa.

## Tornien konkreettinen laskenta

Alkuperäinen PNG **1536×1024 px**. Origo kuvan vasemmassa yläkulmassa. Koordinaatit ovat näkyvän tornin kattokannen likimääräisiä keskipisteitä (noin±10px), eivät mitattuja rakennuskoordinaatteja. Kierros alkaa etuvasemmalta ja kulkee vasenta reunaa taakse:

| # | Näkyvä paikka | Kattokannen keskikohta(x,y) |
|---|---|---|
| 1 | Etuvasen, pääportaalin vasen torni | (547,387) |
| 2 | Vasen sivu | (359,237) |
| 3 | Takavasen | (463,100) |
| 4 | Takakeski | (757,57) |
| 5 | Takaoikea | (1058,100) |
| 6 | Oikea sivu | (1177,237) |
| 7 | Etuoikea, pääportaalin oikea torni | (992,387) |

Näissä on **seitsemän erillistä kahdeksankulmaista kattokantta**. Takakeskellä näkyy yksi yhtenäinen kansi, ei kahta erotettavaa tornia. Kahdeksatta tornia ei voi osoittaa koordinaatilla eikä sille ole kuvassa selvää peittävää estettä. Yläviisto näyttää lähes koko kattokehän, joten puuttuvaa tornia ei ole perusteltua kuitata varmasti takapuolelle piiloutuneeksi. Kuva ei yksin todista lopullisen3D-mallin kokonaismäärää, mutta se ei kelpaa kahdeksantornisuuden luotettavaksi syöteviitteeksi.

## Muut vaatimukset

- **Kahdeksankulmainen runko: UNCERTAIN / tornijako FAIL.** Päämuuri on monikulmainen ja tornit kulmikkaita, mutta ulkokehän seitsemän tornin rytmi estää vahvistamasta tilattua säännöllistä kahdeksan kulman järjestelmää. Sisäpihan monikulmio ei korjaa ulkorungon puuttuvaa kulmatornia.
- **Avoin piha: PASS näkyvyyden osalta.** Keskellä on katoton, kahdeksankulmaiseksi luettava aukko ja sisäseiniä, ei keskelle rakennettua massaa. Pihan pohjaa, huoneita tai kaikkia sisäovia ei nähdä.
- **Nykyinen tasakatto: PASS päämuotona.** Vaalea tasainen kattokehä ja matalat reunat; ei keksittyjä kartio-/harjakattoja tai tornien kolmatta kerrosta. Kannen pinnan ja päämuurin korkeussuhteet ovat kuvallisia arvioita.
- **Aukotus: WARNING.** Etusivun suuri pääportaali ja portaat vastaavat lähteiden itäistä sisäänkäyntiaihetta. Näkyvät muut ikkunat ovat pieniä ja vaihtelevia, mutta pohjoisen yksilöllistä kolmiosaista ikkunaa ja lännen sivuovea ei tästä näkymästä pystytä yksiselitteisesti tunnistamaan. Niitä tai peittyviä sivuja ei vahvisteta. Kaikkiin seitsemään näkyvään tornikanteen toistettu samanlainen suorakaideluukku ja kattokehän pienet luukut vaativat lähdevarauksen; koonti ei osoita jokaisen niistä tarkkaa paikkaa.

**KK:lle epävarmuusrivi:** Mallikuvassa näkyy vain7kulmatornia eikä kahdeksannelle löydy varmaa peittynyttä paikkaa; piha ja tasakatto tunnistuvat, mutta kuva ei vielä todista tilattua kahdeksantornista ulkorunkoa.

Tämä ei myönnä Tripo-lupaa, historiallista hyväksyntää tai uutta generointia.
