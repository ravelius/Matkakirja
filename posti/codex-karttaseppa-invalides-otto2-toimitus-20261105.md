# Invalides otto 2 #2114 — kahdeksan kuvaa toimitettu arviointiin, QA FAIL

Karttasepälle / KK:lle. Tilaus 24e (lähdecommit 489788225d36c1c95d3a4c1168ca5a4953f0b4e6, blob a4a13cebd1e4c31ed67fbd1fabc7877db6f6aa2a) on tehty yhden kuvallisen kierroksen rajassa. Omistajan #2115 rinnakkaislupa huomioitu. Alkuperäistä Invalides-erää ei muutettu.

**8 syntynyttä kuvaa, 9 työkalulähetystä.** Ensimmäinen yläkuvalähetys palautti HTTP400 invalid_image_file ja tuotti 0 kuvaa. Tekninen uudelleenlähetys käytti saman IGN/Commons-lähteen virallista 1280 px esikatselua; alkuperäinen säilytettiin. Kaikki kahdeksan tuotantokuvaa ovat muuttamattomia native RGB 1536 × 1024 PNG:itä. Laadun perusteella ei tehty uusintoja.

## Varmennettu toimitus

- [20 tiedoston erä, SHA256SUMS ja arkkikuva](https://github.com/ravelius/Matkakirja/tree/a614d2393e365efb8dc18852c2be50b8e3828d6b/posti/codex-karttaseppa-invalides-otto2-20261105)
- Artefakticommit: `a614d2393e365efb8dc18852c2be50b8e3828d6b`
- 19 628 473 tavua; kaikki tiedostot luettu takaisin commitista ja SHA256 täsmäsi.
- Paikallinen arviointihakemisto: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-sarja-20261105/_review-sarja-24/invalides-otto2/`
- [Mitattu QA](https://github.com/ravelius/Matkakirja/blob/a614d2393e365efb8dc18852c2be50b8e3828d6b/posti/codex-karttaseppa-invalides-otto2-20261105/huomiot.md), QA.json, generation-history.json ja prompts.json ovat paketissa.

## QA:n todellinen tulos

**FAIL — diagnostiikka- ja arviointierä, ei hyväksytty tuotantosarja.**

| Sivukuva | Leveys px | Korkeus kärkeen px | Alasiiven lista maasta px | W/H-poikkeama |
|---|---:|---:|---:|---:|
| Etelä | 1456 | 537 | 97 | +13,33 % |
| Pohjoinen | 1448 | 550 | 120 | +10,04 % |
| Itä | 1443 | 500 | 109 | +12,70 % |
| Länsi | 1459 | 517 | 113 | +10,20 % |

Vastakkaisleveyksien erot 0,55 % ja 1,10 % läpäisevät 5 % rajan. Korkeussuhteet eivät läpäise. Listakorkeuden vaihtelu on 20,96 % ja päämaaviivojen ero 12 px. Etelän erillinen U-siipi on lisäksi 34 px pääkirkon maaviivaa alempana. Mitat, epävarmuus ±4 px ja merkityt mittauskuvat ovat paketissa.

Yläkuva ylittää jalanjäljen; etelän pihamäärät vaihtuvat kuvasta toiseen. Yläkuvan eteläpuolella on lännessä 4 ja idässä 6 pihaa; tavoite on 3 ja 4. Lounaiskuvassa itäpihoja on edelleen 6. Koilliskuvassa 3/4-jako toteutuu, mutta kamera on lähes suoraan pohjoisesta eikä vastakkainen kulmanäkymä. Viistojen 65 asteen kulmaa ei ole saatu luotettavasti mitattua johdonmukaisesta ortografisesta projektiosta, joten sitä ei merkitä läpäistyksi.

Maapohjan kaksi vaaleaa laikkua poistuivat, mutta luoteispuiston koilliskulman sisennys täyttyi myös sallitun alueen ulkopuolella. **Älkää käyttäkö tätä maapohjaa hyväksytyn v1-pohjan korvaajana.** V1 säilyy ennallaan. Vertailu ja pikselierot ovat QA:ssa.

## Lähteet ja rajat

Koko korttelin mittarina IGN:n vuoden 2018 ortokuva Commonsista (Licence Ouverte 1.0; tilaus 24e ehdotti tätä sarjaa), kokonaisrakennuksen valokuvana Eric Gaban Invalides aerial view (CC BY-SA 3.0). Museon oma lähde tukee noin 107 m huippukorkeutta. Pohjoispää tarkistettu esplanadin/Seinen ja eteläpää Place Vaubanin/kupolin avulla; jalanjäljen 94° idästä myötäpäivään on kirjattu. Hakuvuorot olivat kohteelle yksin varattuja; ei 429-vastauksia eikä Overpassia. Lähteet, lisenssit, 38 lähdetiedoston varmennus ja tekninen syötekorjaus on dokumentoitu.

Omistajahyväksyntä ja vastaanottajan hyväksyntä ovat avoinna. Ei Tripo-toimitusta, R2-siirtoa, pelin integraatiota tai julkaisua. Uutta kuvakierrosta ei käynnistetty.
