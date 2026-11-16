# Hallgrímskirkja 2418 — riippumaton visuaalinen QA

Tarkastin viiden renderöidyn suunnan kuvat sekä lähdekuvat 2 ja 3 rinnakkain. Tämä on kuvallinen arvio Blender Workbench -renderistä, ei peli-integraation tai lopullisen mallin hyväksyntä.

## Ulkomitat ja tavoiterajat

Renderin ilmoittamat rajat ovat 49,60 × 67,71 × 74,50 m ja vastaavat asetettuja tavoiterajoja. Edestä ja sivuilta rakennus mahtuu kehykseen; siipien ja apsiksen mukana oleva pohjajalanjälki on uskottava. Nämä luvut vahvistavat skaalauksen rajat, eivät sisäisten osien mittasuhteita.

## Sisäinen muoto, tekstuurit ja saumat

- Torni näyttää lähdekuviin verrattuna edelleen liian kapealta suhteessa korkeuteensa. Ero näkyy selvimmin sivukuvissa 2 ja 4: torni on hyvin ohut akseli pitkän runko-osan rinnalla. Etukuvassa porrastetut sivusiivet tuovat alaosaan leveyttä, mutta eivät poista kapeaa vaikutelmaa kellotason ja huipun suunnassa.
- Sivunäkymässä runko ja tumman katon muodostama korkea, yhtenäinen massa vaikuttaa lähdekuvien valokuvallista vaikutelmaa pystymmältä. Tätä on vaikea erottaa kuvakulman ja anisotrooppisen skaalauksen vaikutuksesta; en arvioi mittasuhteiden olevan tältä osin hyväksytyt.
- Apsi, kattolinja, pitkät sivuikkunat ja julkisivun porrastuvat harjanteet ovat luettavia. Takakuvassa katon pääty muodostaa näkyvän tumman kolmion tornin taakse; se näyttää pääty-/kattogeometrialta, ei selvältä renderöintisaumalta.
- Pinnoissa ei näy selviä repeämiä tai tekstuurin venymisen aiheuttamaa suttua viidessä kuvassa. Pienet koristeet ja ikkunat ovat kuitenkin anisotrooppisesti skaalatussa mallissa muodoltaan venyneitä, joten tekstuurin terävyys ei yksin vahvista geometrian mittasuhteita. Joitakin tummia alueita näkyy etu- ja takajulkisivun tornin sivuilla; tarkkuudella ne näyttävät syvennyksiltä/varjoilta, eivät varmalta UV- tai mesh-sauman virheeltä.
- Yläviistokuva näyttää rakennuksen suunnan ja kattomassan, mutta perspektiivi peittää osan jalustan ja siipien liitoksista.

## Suositus

**Sopii KK:n katselmointiin ehdokkaana**, koska kaikki viisi näkymää, tavoiterajat ja tekstuurien yleinen eheys ovat tarkastettavissa. **Ei lopulliseen hyväksyntään vielä**: tornin kapeus on selvä sisäisen muodon huoli, eikä tavoiterajojen osuminen ratkaise sitä. Tämä arvio ei muuta mallia.
