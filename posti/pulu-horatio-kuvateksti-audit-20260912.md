# Euroopan hahmokuvien ja lyhyiden kuvatekstien inventaario

Päivä: 12.9.2026  
Lähtö: `accc7def50011129274a3423a031ca5d9a4217ed`  
Rajaus: `js/packs/fokusvirrat.js`:n kaikki 45 rekisteröityä Euroopan pakettia sekä niiden `matkakirja.luentakuva`, `matkakirja.luentakuva2`, `pollo.kuvat` ja mahdolliset kuvafallbackit. Tämä on pelkästään tekstidatan ja kenttien auditointi; kuvia ei ole katsottu eikä visuaalisesti hyväksytty.

## Tulos lyhyesti

- Rekisterissä on 45/45 kaupunkia.
- Isoisä: 90 kelvollista luentakuvaa. Jokaisella kaupungilla on sekä `luentakuva` että `luentakuva2`; puuttuvia kakkoskuvia ei ole.
- Pulu: 58 kelvollista `pollo.kuvat`-kuvaa. Vain 9/45 kaupungilla on vähintään kaksi PuluCam-kuvaa; 36/45 kaupungilta puuttuu toinen. Jakauma on 36 × 1 kuva, 7 × 2 kuvaa, Dubrovnik 3 kuvaa ja Venetsia 5 kuvaa.
- Venetsian viiden kuvan romanssialbumi on tunnistettu tarkoitukselliseksi poikkeukseksi. Sitä ei pidä karsia kahteen.
- Kaikissa 148 varsinaisessa albumikuvassa on `lyhyt`. Yksikään ei ylita 100 merkkiä.
- Isoisän lyhyet: 90 kpl, 40–82 merkkiä, keskiarvo 56,9. Kaikissa rakenne on paikka/vuosi + yksi sisältölause; paikkariviä ei ole laskettu ongelmalliseksi toiseksi lauseeksi.
- Pulun lyhyet: 58 kpl, 35–72 merkkiä, keskiarvo 53,9. Niistä 49 on yksi sisältölause ja 9:ssä on kaksi sisältölausetta tai selvästi kaksi erillistä virkebeatia.
- Kenttäfallback ei täytä puuttuvaa PuluCam-kuvaa: jokaisessa 45 paketissa on myös `pollo.kuva`, mutta moottorin oma kommentti määrittelee sen kaupunkilehden herokuvaksi ja `pulunKuvat()` lukee vain `pollo.kuvat`-listan. Kuudessa ensimmäisessä paketissa (Ateena, Sofia, Istanbul, Rooma, Bukarest, Sarajevo) on lisäksi `matkakirja.kuva`; sekään ei kuulu isoisä/PuluCam-yhteiskaruselliin.

## Kuvamäärät ja merkkilaskenta kaupungeittain

Merkinnät: I1/I2 = isoisän `luentakuva`/`luentakuva2`; P1… = `pollo.kuvat` toimitusjärjestyksessä. Sulkeissa on `lyhyt`-kentän Unicode-merkkien määrä. Tähti tarkoittaa useampaa kuin yhtä sisältölausetta.

| Kaupunki-id | Isoisä | Pulu | Huomio |
| --- | ---: | ---: | --- |
| ateena | I1 50, I2 63 | P1 47 | P2 puuttuu |
| sofia | I1 45, I2 69 | P1 35 | P2 puuttuu |
| istanbul | I1 57, I2 82 | P1 42 | P2 puuttuu; koko aineiston pisin I-lyhyt |
| rooma | I1 40, I2 54 | P1 53 | P2 puuttuu; koko aineiston lyhin I-lyhyt |
| bukarest | I1 73, I2 60 | P1 50 | P2 puuttuu |
| sarajevo | I1 45, I2 68 | P1 66 | P2 puuttuu |
| madrid | I1 47, I2 66 | P1 54 | P2 puuttuu |
| wien | I1 48, I2 47 | P1 49 | P2 puuttuu |
| pariisi | I1 48, I2 60 | P1 55 | P2 puuttuu |
| berliini | I1 53, I2 56 | P1 68 | P2 puuttuu |
| lontoo | I1 65, I2 70 | P1 59* | P2 puuttuu |
| budapest | I1 48, I2 66 | P1 48, P2 50* | kaksi Pulu-kuvaa |
| dubrovnik | I1 42, I2 51 | P1 50, P2 42, P3 54* | kolme Pulu-kuvaa; ei puute |
| praha | I1 47, I2 69 | P1 60 | P2 puuttuu |
| tukholma | I1 58, I2 62 | P1 46 | P2 puuttuu |
| kobenhavn | I1 60, I2 55 | P1 59 | P2 puuttuu |
| helsinki | I1 55, I2 62 | P1 65, P2 47 | kaksi Pulu-kuvaa |
| tallinna | I1 48, I2 54 | P1 53 | P2 puuttuu |
| sevilla | I1 54, I2 58 | P1 44 | P2 puuttuu |
| bergen | I1 43, I2 59 | P1 52, P2 41 | kaksi Pulu-kuvaa |
| amsterdam | I1 49, I2 59 | P1 57, P2 47 | kaksi Pulu-kuvaa |
| dublin | I1 41, I2 47 | P1 54* | P2 puuttuu |
| edinburgh | I1 57, I2 62 | P1 59 | P2 puuttuu |
| lissabon | I1 45, I2 56 | P1 62* | P2 puuttuu |
| riika | I1 49, I2 54 | P1 44 | P2 puuttuu |
| barcelona | I1 49, I2 58 | P1 54* | P2 puuttuu |
| firenze | I1 66, I2 61 | P1 60 | P2 puuttuu |
| venetsia | I1 42, I2 51 | P1 57, P2 57*, P3 55*, P4 54, P5 49 | viiden kuvan romanssialbumi; säilytetään |
| marseille | I1 64, I2 68 | P1 56 | P2 puuttuu |
| oslo | I1 57, I2 63 | P1 60, P2 55 | kaksi Pulu-kuvaa |
| tampere | I1 62, I2 66 | P1 57, P2 72* | kaksi Pulu-kuvaa; pisin P-lyhyt |
| vilna | I1 55, I2 61 | P1 62 | P2 puuttuu |
| granada | I1 57, I2 67 | P1 48 | P2 puuttuu |
| kiova | I1 54, I2 53 | P1 47 | P2 puuttuu |
| krakova | I1 53, I2 61 | P1 66 | P2 puuttuu |
| moskova | I1 52, I2 67 | P1 56 | P2 puuttuu |
| odessa | I1 58, I2 61 | P1 44 | P2 puuttuu |
| pietari | I1 45, I2 44 | P1 59 | P2 puuttuu |
| varsova | I1 56, I2 64 | P1 59, P2 44 | kaksi Pulu-kuvaa |
| kreeta | I1 62, I2 59 | P1 66 | P2 puuttuu |
| sisilia | I1 54, I2 59 | P1 52 | P2 puuttuu |
| islanti | I1 47, I2 72 | P1 62 | P2 puuttuu |
| alpit | I1 53, I2 67 | P1 51 | P2 puuttuu |
| lappi | I1 62, I2 59 | P1 53 | P2 puuttuu |
| tromssa | I1 65, I2 68 | P1 59 | P2 puuttuu |

Kaksi Pulu-kuvaa on Budapestissa, Helsingissä, Bergenissä, Amsterdamissa, Oslossa, Tampereella ja Varsovassa. Lisäksi Dubrovnikissa on kolme ja Venetsiassa viisi. Kaikissa muissa 36 kaupungissa on vain yksi varsinainen `pollo.kuvat`-kuva.

## Useamman sisältölauseen lyhyet

Nämä ovat ainoat noin yhden lauseen tavoitteen poikkeamat. Ne eivät ole merkkimäärältään pitkiä; useimmissa toinen virke on tietoinen kuiva loppulyönti.

| Kuva | Merkit | `lyhyt` |
| --- | ---: | --- |
| Lontoo P1 | 59 | `Lontoo: parlamentti jäi taustalle. Penkillä oli tärkeämpää.` |
| Budapest P2 | 50 | `Budapest: nimi yhdisti kaupungit. Joki jäi väliin.` |
| Dubrovnik P3 | 54 | `Dubrovnik: kuusitoista suuta, yksi kaivo. Tarkastettu.` |
| Dublin P1 | 54 | `Dublin: vuokrasopimus on pitkä. Minun pysähdykseni ei.` |
| Lissabon P1 | 62 | `Lissabon: hissin yläpää. Siipiä myydään ilmeisesti pareittain.` |
| Barcelona P1 | 54 | `Barcelona: kulma leikattiin pois. Näkymään tuli tilaa.` |
| Venetsia P2 | 57 | `Venetsia: sama paikallinen. Kaupunki on yllättävän pieni.` |
| Venetsia P3 | 55 | `Venetsia: aukion nimi on… tiedän kyllä. Aivan varmasti.` |
| Tampere P2 | 72 | `Tampere: puutarha katolla, leipäkori reitillä. Hyvä kaupunkisuunnitelma.` |

## Sisällöllinen vertailu: pari, `lyhyt` ja `selite`

### Selkeimmät päällekkäisyydet

1. **Riika I1/I2** on lähes sama havainto kahdesti: ”Kuoro hengitti kaupungin kokoiseksi” / ”Yleisö kuuli kuoron yhteisen hengityksen”. Myös molemmat pitkät selitteet rakentuvat kuoron yhteiselle hengitykselle. Kuvaparin toinen teksti ei erottele toista kuvaa riittävästi.
2. **Amsterdam I1/I2** kertoo saman tuolin ikkunanostosta ennen ja jälkeen; **P1/P2** tekee nykyajassa saman nojatuoli–ikkuna-noston uudelleen. Sarja on ymmärrettävä, mutta neljä kuvatekstiä nojaa yhteen temppuun, joten kuvien itsenäinen tunnistettavuus on heikko.
3. **Sarajevo I1/I2/P1** toistaa vasaran, pannun ja aamukahvin kolmena versiona. P1:n pitkä `selite` kertoo vielä isoisän huomanneen käsityön vasta kahvin jälkeen. Historiallinen ja nykyhetken kuva eivät erotu lyhyistä teksteistä selvästi.
4. **Edinburgh I1/I2**: molemmissa sukat riippuvat korkealla/kuilun yllä, ja pitkät selitteet kertovat saman pyykkinarun ja kaupungin korkeuseron. Toinen kuva kaipaisi eri yksityiskohtaa.
5. **Tromssa I1/P1** on sekä sanastoltaan että ajatukseltaan hyvin lähellä: ”pieni simpukka ja suuri kysymys” / ”yksi simpukankuori ja koko meri täynnä kysymyksiä”. I2 jatkaa samaa meri–museo–kysymyskolmikkoa.
6. **Pietari I1/I2/P1** sanoo kolme kertaa kellon ja vaalean yön ristiriidan. Tekstit ovat hyviä yksittäin mutta albumissa toisteisia.

### Kohtalainen tai tarkoituksellinen jatkumotoisto

- **Bergen I1/I2** on sama kuiva kala / märkä vieras -asetelma. P1/P2 jatkaa samaa sadetta nykyajassa. Tämä toimii sarjana, mutta P2 ”sama sade” ei toimi hyvin irrallaan.
- **Wien I2/P1**: kahvi saapuu, uutinen ei pienene/parane. P1:n pitkä selite myös kertaa isoisän kahvitarinan. Nykykuva ei tuo lyhyessä tekstissä uutta aihetta.
- **Oslo I1/I2** on sama puulastun matka metsästä satamaan; P1/P2 on sama oopperan katto kahdesta kuvakulmasta. Molemmissa pareissa ero on näkökulma, ei aihe.
- **Kiova I1/I2** seuraa samaa liekkiä luolasta päivänvaloon. Se on selkeä kertomuksellinen ennen/jälkeen-pari, joten toisto ei ole automaattinen korjaustarve.
- **Moskova I1/I2** toistaa kellon, mutta vastakohta suuri mykkä Tsaarinkello / pieni toimiva käsikello erottaa kuvat onnistuneesti.
- **Barcelona I1/I2** toistaa viistetyn kulman, kärryt ja kaalit. P1 vie saman aiheen nykyiseen kaupunkikuvaan. Selkeä aikasilta, mutta vähän albumin sisäistä vaihtelua.
- **Tampere I1/I2** on sama lanka–kädet–koneet-ajatus eri rajauksella; P1/P2 on sama kattopuutarha ja leipäkoria kuljettava tarjoilija. Molemmat parit ovat sarjallisia, mutta P2:n pitkä selite selittää saman kuvan tapahtuman jo hyvin perusteellisesti.
- **Ateena I1/I2/P1** kierrättää kultaa, kahvia ja kolikkoa. Eri aikatasot erottuvat, mutta P1:n pitkä selite kertaa suoraan isoisän väittelyn.
- **Venetsia P1–P5** toistaa ”paikallisen” ja kuvauksen tekosyyt tarkoituksella romanssialbumin juonena. Tämä on poikkeus, ei tiivistettävä duplikaatti.

### Geneeriset tai albumijärjestyksestä riippuvat lyhyet

Nämä eivät yksin kerro kovin tarkasti, mitä kuvassa on; pitkä `selite` pelastaa kontekstin, mutta lyhyt albumiotsikko jää riippuvaiseksi edellisestä kuvasta tai pronominista.

- Dubrovnik P2: `Dubrovnik: sama vesi, lisää puheenvuoroja.`
- Sevilla P1: `Sevilla: sama portti, toisenlainen työpäivä.`
- Bergen P2: `Bergen: ulkona satoi aivan samaa sadetta.`
- Kiova P1: `Kiova: tähän kuvaan jätin tilaa hiljaisuudelle.`
- Venetsia P4: `Venetsia: tämä kuva käsittelee kuulemma lentoreittejä.`
- Venetsia P5: `Venetsia: nämä eivät kaikki kuuluneet esitykseen.`

Venetsian P4/P5 ovat kuitenkin romanssialbumin tarkoituksellisia punchlineja, joten niiden geneerisyys on vain itsenäisen saavutettavuuden huomio, ei karsintaehdotus.

### Yli selittäminen

- Varsinaisissa `lyhyt`-kentissä ei ole merkkimääräistä yli selittämistä: kaikki jäävät 35–82 merkkiin ja alle 100 merkin liputusrajan.
- Yhdeksän kaksivirkkeistä Pulu-lyhyttä ovat edelleen lyhyitä; jos tavoite tulkitaan ehdottomaksi yhdeksi lauseeksi, ne ovat mekaaninen korjauslista, mutta tekstillisesti useimmat käyttävät toista virkettä tarkoituksellisena kuivana loppuna.
- Pitkä `selite` on useissa tapauksissa 350–405 merkin pienoisjuttu. Auditoinnin ongelma ei ole pelkkä pituus vaan se, että joissakin sarjoissa selite kertaa sekä lyhyen tekstin että isoisän tapahtuman. Selkeimmät tapaukset ovat Sarajevo P1, Wien P1, Amsterdam P1, Riika P1 ja Ateena P1. Näissä nykyhetken lisäarvo jää osittain historiallisen tekstin referoinnin alle.

## Johtopäätös tuotannolle

Ensisijainen kattavuusaukko on Pulun toinen varsinainen kuva: 36 kaupunkia tarvitsee P2:n, jos vaatimus on kaksi kuvaa kummallekin hahmolle. Isoisän kuvakattavuus on jo täysi. Tekstipituus ei muodosta estettä. Ennen uusien tekstien tuotantoa kannattaa säilyttää nykyisten vahva tiiviys ja erottaa erityisesti Riian, Amsterdamin, Sarajevon, Edinburghin, Tromssan ja Pietarin kuvaparit toisistaan eri konkreettisilla kuva-aiheilla. Venetsian viiden kuvan romanssikaari pidetään kokonaisena.

