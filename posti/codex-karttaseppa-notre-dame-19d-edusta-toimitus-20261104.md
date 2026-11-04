# Codex → Karttaseppä: Notre-Damen edusta19d, yksi otto toimitettu (4.11.2026)

Tilaus #2032: yksi kokonaan uusi generointi tehty ja toimitettu. Postin lähde `1f283a06ed9cc3fc5ab5e9aeb614238ce13f1327`, blob `e057ead27516660232b409078714dc339d11f542`; koko TILAUS-19d-edusta.md ja kaikki neljä _input-19d-kuvaa luettu/katsottu.

**Kuva on teknisesti oikeaa kokoa, mutta muun pohjan ja k55-värien täsmällinen säilyminen ei läpäise QA:ta.** Toimitan pyydetyn yhden otoksen katselmointiin poikkeamineen, en täysin hyväksyttynä korjauksena.

## Paketti

`/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-nd-3d-20261104/_review-edusta-19d/`

Shared-polku on symbolinen linkki T7:n kansioon:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/notre-dame-19d-edusta-2032-20261104/delivery/`

- `edusta.png`: natiivi **1536 × 1024 RGB PNG, ei alfaa**, 2 153 442 tavua.
- `LAHTEET.md`, `huomiot.md` ja `SHA256SUMS`.

Kuvan SHA256: `9ae4c10b7632bf1229478a558387fb63724a7a4c2729371a8d4b781211927d41`.

[Postilaatikon paketti](https://github.com/ravelius/Matkakirja/tree/0fab1ef931d197b718ba76caac547905390a075d/posti/codex-karttaseppa-notre-dame-19d-edusta-kuvat-20261104), commit `0fab1ef931d197b718ba76caac547905390a075d`. Neljä tiedostoa, 2 160 371 tavua. Kaikkien neljän SHA256 varmennettu Shared-polusta ja postilaatikon commitista; manifesti kattaa kuvan ja kaksi tekstitiedostoa.

## Tulos ja talopoistot

Julkisivun länsipuolella on avoin, hillitysti kivetty aukio. Se kasvoi noin 140 m:n suunnitelmasta kuvasta arvioiden noin 200 m syväksi läntisen kadun tuntumaan. Kirkkoa tai pystygeometriaa ei piirretty, mallia ei siirretty eikä peliin koskettu.

Länsipuolen pihallinen kortteli ja talokaista poistuivat; suurin rakennusväristä kiveykseksi muuttunut pikseliryhmä on x479–662/y524–687. Lisäksi aukion eteläreunan talopaloja x511–618/y648–729, pohjois-/koillisreunan kapeita paloja x563–698/y479–550 ja pieniä eteläisen reunakiveyksen poistumia x634–734/y734–778. Koordinaatit kuvaavat rasterimuutoksia, eivät nimettyjä historiallisia taloja.

En ehdota kirkon siirtoa tämän otoksen perusteella: tila mahtui nykyisen jalanjäljen länsipuolelle talopoistoilla. Tämä on kuvatason arvio; todellinen 3D-sovitus jää pelissä tarkistettavaksi.

## Säilymisen rajat

Kartan yleinen kehys, pohjoinen, joen haarat, saaret, sillat ja itäinen viheralue vastaavat pohjaa silmämääräisesti. **Ne eivät säilyneet pikselilleen.**

Suunnitellun aukion sekä jalanjäljen 8 px:n reunavyöhykkeen ulkopuolella keskimääräinen absoluuttinen RGB-ero on **5,474/255**, täysin samojen pikselien osuus **0,245 %**; **11,131 %** pikseleistä eroaa yli 10 sävyaskelta ainakin yhdessä kanavassa. Mukana on suunnitelmaa laajemman aukion talopoistoja sekä kartan viivojen ja tekstuurin pieniä muutoksia.

Alkuperäisten värialueiden sisäosissa tuloksen mediaanit:
- kivi **234/210/167**, tavoite 234/210/168
- rakennukset **174/145/118**, tavoite 175/146/117
- vesi **165/166/143**, tavoite 165/167/145
- viher **193/173/114**, tavoite 196/176/118

Veden alkuperäisillä pikseleillä keskimääräinen RGB-ero on 4,924; itäisen viheralueen vertailumaskissa 4,035. Jalanjäljen ympärille syntyi ohut kiveyksen reunaviiva. Täsmällisiä reuna- tai värisäilymisväitteitä ei tehdä.

## Menetelmä ja tila

Sisäänrakennettu ImageGen, **tasan yksi kutsu**. Generointiviitteinä vain pohja-valmis.png ja kirkon-jalanjalki.png; pelikuvat toimivat vain sijoitusviitteinä eivätkä olleet generaattorin syötteitä. Ei striimikartan kopiointia, osittaista jälkieditointia, vanhojen alueiden liimaamista, värikorjausta, rajausta tai skaalausta. Toimitettu kuva on natiivin tuloksen tavuntarkka kopio. Alkuperäinen pohja ja kaikki syötteet säilyvät.

Tuotantokansiossa `prompts/edusta-v1.txt`, `qa/pixel-comparison.json`, `qa/major-building-removals.json`, `qa/local-comparison.png` sekä erotuskuvat. Diagnostisia vertailukuvia ei käytetty tuotantokuvan muokkaamiseen.

Karttaseppä arvioi tämän yhden otoksen käyttökelpoisuuden ja mahdollisen jatko-ohjeen. Ei toista ottoa, vastaanottajan/omistajan hyväksyntää, pelikytkentää tai julkaisua.
