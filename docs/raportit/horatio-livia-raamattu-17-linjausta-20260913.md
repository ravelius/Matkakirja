# Raamattu: 17 linjauksen jäljitettävyys ja PR #2322:n rajaus

Tila 13.9.2026: docs-only-korjaus Fablen tarkistettavaksi, ei kanonisen
Raamatun muutospäätös. Vertailupohja on main v1822,
`2ee57c53eacb72f60d5deb5bab65ee43db740f4c`. PR:n aiempi ehdotus poisti
17 omistajalinjauksen otsikkoa; Fable hylkäsi sen. Tässä korjauksessa
`js/tyohuone-raamattu.js` palautetaan täsmälleen mainin sisältöön.
Näin myös mainiin sittemmin tulleet linjaukset säilyvät. Fable kirjoittaa
mahdollisen kanonisen yhdistämisen itse tämän kartan perusteella.

## Päätösten etusija

Uusi toimitusohje ei itsessään kumoa vanhaa omistajan päätöstä.
Nimenomaiset myöhemmät päätökset koskevat tässä seuraavia rajattuja asioita:

- Isoisää lyhennetään, Pulua elävöitetään ja hieman pidennetään. Omistaja:
  ”joo hyvä, juuri noin. ja isoisän ja pulun repliikkien pituus voi myös
  vaihdella kunhan kokonaispituus ei kasva”. Yhteismitta koskee kaupunkiparia,
  ei Euroopan keskiarvoa. Vanha alle 300 merkin automaattinen täyttö ja
  Pulun 125 merkin toimituskatto eivät ohita tätä tilausta.
- Lyhyt kuvateksti on noin yksi lause. Pitkä on enintään yhden lauseen
  pidempi, ja vain pitkään tulee lähdemerkintä. Vanha pitkän kuvatekstin
  300–600 merkin tavoite väistyy.
- Pulu: Flicker `piI8Kku0DcvcL6TTSeQt`, `eleven_v3`. Horation ääni säilyy.
- Viimeisin yötyölupa: ”menen nukkumaan. hyvältä näyttää. tehkää kaikki
  loppuun. voit generoida luennat sitten isoisälle ja pululle koko eurooppaan.”
  Tämä korvaa tämän toimituksen aiemman kaupungeittaisen äänitauon,
  ei muiden linssien, maanosien tai kuvageneroinnin erillisiä lupia.

## Dispositio kaikille 17 kohdalle

Numerot vastaavat alkuperäisen poistodiffin linjauskokonaisuuksia.
Kohdeviitteet ovat otsikoita, jotta rivinumeroiden muuttuminen ei katkaise
jäljitettävyyttä. Kaikki 17 alkuperäistä tekstiä säilyvät nyt kanonisessa JS:ssä.

| # | Vanha linjauskokonaisuus | Säilyvä sisältö / täsmällinen muutos | Docs-kohde ja integraatiotila |
| --- | --- | --- | --- |
| 1 | Omistajan kanssa hyväksytty tekstisession toimitus | Hyväksytty toimitus säilyy sanasta sanaan; virhe palautetaan tekstivetäjälle. Aliagentin ensimmäinen luonnos ei ole automaattisesti hyväksytty. Vanha 125 merkin tarkistus korvautuu uudella parimittauksella. | Tuotantomoduuli: Säilyvät sisältölinjaukset; Kuuntelun ja kuvatekstien pituus. |
| 2 | Horatio 400 merkkiä ja mitat näkyviin | 400 merkin YLÄRAJA säilytetään konservatiivisesti. 360–400 tavoite ja alle 300 merkin täyttö väistyvät nimenomaisen lyhennystilauksen tieltä. Ennen/jälkeen-mitat säilyvät. | Tuotantomoduuli: Kuuntelun ja kuvatekstien pituus. Fable tarkistaa kanonisen sanamuodon. |
| 3 | Pulun linnun näkökulma, 125 merkkiä ja lisäkuittaus | Linnun näkökulma ja perusteltu harvinainen kuittaus säilyvät. Jäykkä 125 merkin katto ja saman nyt/ennen-kaavan pakottaminen eivät ohita uutta sisältö- ja yhteismittapäätöstä. Ateenan/Venetsian nimetyt poikkeukset säilyvät. | Tuotantomoduuli: Livia; Säilyvät sisältölinjaukset; Kuuntelun ja kuvatekstien pituus. |
| 4 | Yksi loppukupla kaupunkiin | Yksi jälkikommenttikupla on pääsääntö; nimetyt poikkeukset säilyvät. Ei uutta lehtivihjekuplaa eikä lisäkuplilla parimittauksen kiertämistä. Vanha jäykkä merkkimäärä ei ole uusi toimituskiintiö. | Tuotantomoduuli: Säilyvät sisältölinjaukset. |
| 5 | Äänitetään ensin Ateena ja Sofia | Korvattu tämän toimituksen osalta nimenomaisella koko Euroopan luentaluvalla ja Flicker-valinnalla. Ihmisen matka -linssin luennat tarvitsevat YHÄ erillisen luvan. | Tuotantomoduuli: Euroopan viimeistelyn ajolupa; livia-aani: Ääni ja Ajojärjestys. |
| 6 | Isoisän ja Pulun ajallinen silta | Yksi ymmärrettävä yhteinen näkökulma ja Pulun nykyhavainto säilyvät. Vakavaa historiaa ei kuitata naljailulla. Sama vuosimäärä tai selitysrakenne ei ole jokaisen kaupungin pakko. | Tuotantomoduuli: Yhteinen sisältöperiaate; Livia; Säilyvät sisältölinjaukset. |
| 7 | Chatin kehystys | Ensimmäinen aihe tai suora puhuttelu: Livian oma lyhyt alku, kirjakielinen tietovastaus ja oma loppukommentti. Kaupunkien uusi persoonalinja ei poista tätä. Vanha ”pöllön ääni” ei oikeuta lukitun voice_id:n vaihtoon. | Tuotantomoduuli: Säilyvät sisältölinjaukset. Ei chat-generoinnin laajennusta. |
| 8 | Automaattisten jatkokysymysten kehys | Saman aiheen jatkovastaus ilman uutta kehystä; uudessa aiheessa kehys palaa. | Tuotantomoduuli: Säilyvät sisältölinjaukset. |
| 9 | Horation kahdeksan omaa termiä | Jo Raamatussa 9.9. hyväksytty viiden termin lista korvaa kahdeksan: peilaus, painolasti, K3, yövahti, lakkipiste; G. on nimi. Ei oma-aloitteisia uusia termejä. Vanhaa 4–7 kaupungin eikä vierekkäisiin kaupunkeihin painottuvaa jakelua EI ole tässä julistettu kumotuksi. | Tuotantomoduuli: Horatio; Säilyvät sisältölinjaukset. Fable tarkistaa jakelusäännön sovituksen, ilman jo hyväksyttyjen äänien automaattista uusintaa. |
| 10 | Paikalliskielten väärinymmärrys | Horatio saa ymmärtää paikallisen sanan väärin; Livia osaa kielet. Aiemman nimetyn paikalliskielierän kaupunkijakoa ei korvata docs-siirrolla uudella kiintiöllä eikä tulkita perutuksi. | Tuotantomoduuli: Säilyvät sisältölinjaukset. Fable tarkistaa aiemman kaupunkijakopäätöksen kaanonissa. |
| 11 | Outo sanasto opitaan yhteydestä | Horatio ei määrittele omaa sanastoaan lukijalle; toisto ja konteksti opettavat. Pulun mahdollinen selitys perustellaan tilanteen tai vitsin kautta, ei joka kommentin sanakirjana. Vanha 6+2 lukumäärä väistyy jo hyväksytyn viiden termin listalle. | Tuotantomoduuli: Horatio; Säilyvät sisältölinjaukset. |
| 12 | Horatio kirjoittaa itselleen; pahuusrajan poisto | Yksityinen päiväkirja, paikallisten kunnioitus ja myös ihmisistä tulevan vaaran salliminen säilyvät. Grimshaw ei edelleenkään ole vaarallinen. Nykyisten hyvien oivallusten säilytys ei pakota kaikkien tekstien uudelleenkirjoitusta. | isoisan-raamattu: Isoisä; Imu aikuiselle; Vastavoima. Tuotantomoduuli: Horatio. |
| 13 | Valittujen kaupunkien lisähuudahdus | Harvinainen, juuri isoisän kohtauksesta motivoitu lisäkuittaus ja olemassa olevat nimetyt välihuudot säilyvät; uusia ei lisätä jokaisen kaupungin kaavaksi. | Tuotantomoduuli: Säilyvät sisältölinjaukset; livia-aani: Kaupungin kulku. |
| 14 | Kuva vaihdetaan vain, jos se ei vastaa tekstiä | Hyväksytyt kuvat säilyvät. Vanhan neljän nimetyn korjauksen / 41 säilyvän kuvan erä ei ole lupa uusia nykyisiä kuvia. Todellinen ristiriita tutkitaan kuvasta, alkuperä ja vanha versio säilyttäen; uusi generointi tarvitsee erillisen luvan. | Tuotantomoduuli: Kuvien alkuperä ja säilytys; Kuvaparit. |
| 15 | Havainnekuva-linkki ja PNG | Havainnekuva-linkki vain pitkään tekstiin; yksi RGBA-PNG-sinetti ja hyväksytty PuluCam-toteutus säilyvät. Vanha pitkän tekstin 300–600 merkin tavoite korvautuu enintään +1 lauseella. Aiempi tarraehdokkaiden valinta ei avaudu uudelleen. | livia-aani: Pulun kuva / PuluCam-toteutus; Tuotantomoduuli: Kuuntelun ja kuvatekstien pituus. |
| 16 | PuluCam vain tekstivetäjän kuva-aiheista | Tekstivetäjä omistaa aiheen, merkityksen ja promptin; kuvatoimitus kirjaa provenanssin eikä tuo itsenäisiä uusia aiheita tämän luvan perusteella. Kuva tarkistetaan todellisesta valmiista aineistosta. | Tuotantomoduuli: Säilyvät sisältölinjaukset; Kuvaparit; Työnjako. |
| 17 | Eurooppa yhtenä luettavana MD-toimituksena | Yksi 45 kaupungin Markdown-lukukopio sekä ennen/jälkeen-mitat säilyvät vaatimuksena. Myöhempi viimeistelylupa korvaa erien pysäyttämisen jokaiseen uuteen käyttäjäkuittaukseen; Fable on edelleen lopullinen integraattori/julkaisija. | Tuotantomoduuli: Luettava toimitus; Työnjako; Euroopan viimeistelyn ajolupa. |

## Fablen integraatioportti

1. Tarkista yllä oleva sisältölinjausten säilytys ja mahdolliset kanoniset
   sanamuodot. Pääsessio ei poista tai muokkaa kanonisia JS-linjauksia.
2. Lisää uuden `docs/moduulit/horatio-livia-tuotanto.md`-moduulin rivi
   Raamatun dokumenttikarttaan itse tai samassa sovitussa integraatiossa.
   Tämä on ainoa docs-only-korjauksen tunnettu testiriippuvuus.
3. Docs-tarkistus ennen katalogimuutosta: `dokumentit.test.mjs` ja
   `raamattu-muokkaus.test.mjs`, 14 PASS / 1 FAIL; FAIL on uuden moduulin
   puuttuva katalogirivi. Testiä ei ohiteta eikä merkitä vihreäksi.
4. Tämä PR ei vaihda peliversiota, julkaise, generoi ääniä tai muuta
   jäädytetyn `eu-hl-europe-20260913-r2-approved1`-aineiston sanoja.
   Hyväksytty Euroopan ääni-/kohdistustyö saa jatkua oman ajolupansa nojalla.

Riippumaton 17 kohdan lukukatselmus tehtiin alkuperäisestä poistodiffistä
`2ee57c53...1bea7b29`. Sen havaitsemat puuttuvat toimeenpanoperiaatteet
palautettiin dokumentaatioon. Otsikon katoamista ei käytetä todisteena
siitä, että itse periaate olisi omistajan päätöksellä poistunut.
