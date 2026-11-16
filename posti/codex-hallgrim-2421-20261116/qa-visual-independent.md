# Hallgrímskirkja 2421 — riippumaton kuvallinen QA

## Tulos: WARN_TO_KK_REVIEW

Tarkastin viisi 2421-renderiä ja koontikuvan sekä vertasin 2418-koosteeseen ja mukana oleviin lähdekuviin. Tämä on ehdokkaan katselmointihuomio, ei KK:n hyväksyntä.

- Tornin syvyyden lisäys näkyy sivukuvissa 2 ja 4: tornimassa on nyt paksumpi nave-akselin suunnassa kuin 2418:ssa ja liittyy selkeämmin pitkään runkoon. Edestä näkyvä torni on silti kapea; korjaus ei kasvata tätä julkisivun leveyttä.
- Nave-katon harja on alempana ja sivusiluetti vastaa paremmin 0,375-tavoitesuhdetta. Runko ei enää näytä yhtä korkealta ja raskaalta kuin 2418-koosteessa.
- Tornin sivuilla näkyy korjauksen jälkeen selvä vinottainen/kaartuva saumamainen juova alemmalta keskiosalta kohti nave-katon liittymää. Se erottuu molemmista sivunäkymistä, etenkin kuvassa 2. Se näyttää muodonmuutoksen aiheuttamalta pinnan taitokselta tai venyneeltä tekstuurilta; se ei ole pelkkä matemaattisten mittojen ero. Renderistä ei voi varmistaa, onko kyse UV-venymästä vai geometrian normaalimuutoksesta.
- Katon ja tornin liittymässä näkyy paikallinen porras/taitos, mutta katon päämassa ja tornin siluetti pysyvät yhtenäisinä. Takaa näkyvä tumma harjakaton kolmio jatkuu; se on luettavissa päätygeometriana eikä selkeänä repeämänä.
- Ikkunat, harjanteet ja katon urat pysyvät luettavina. Muualla ei näy ilmeistä laajaa tekstuurin suttaantumista tai pintojen aukeamista. Yläviistokuva vahvistaa massojen järjestyksen mutta peittää tornin/naven saumakohdan yksityiskohtia.

**Suositus:** KK voi tarkastella ehdokasta syvyyden ja harjakorkeuden parannusten vuoksi, mutta tornin sivun vinottainen juova on ratkaistava tai hyväksyttävä tietoisesti ennen lopullista hyväksyntää. Pelkkä OSM-mitan ja harjakorkeuden osuma ei poista tätä näkyvää pintahuolta.
