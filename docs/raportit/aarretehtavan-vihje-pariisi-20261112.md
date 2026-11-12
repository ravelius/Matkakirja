# Aarretehtävän vihje: Pariisi (SK 12.11.2026, KK 20.4x tehtävä 1)

## Löydös
Pariisin vihreän pisteen aarretehtäviä (tarinakaari, tietovisa) on YKSI: Colette, "Seinen rannalla kirjoja on myyty laatikoista vuosisatoja. Mistä myyjien nimi bukinisti tulee?" (tarinakaari.pariisi.kysymys; js/tyohuone-kehitys-data.js KAARI_PAKETIT). Vastaus on "vanhaa kirjaa tarkoittavasta sanasta" (bouquin).
Lehden aarteen avaus -visat (Piaf, Guimard ym.) ovat toinen järjestelmä: ne avaavat pisteen, eivät ole pisteen aarretehtävä (PK:n selvitys kohta 4). 12.10. kokeilun muut tyypit eivät ole tietovisaa (omistaja 20.40).

## Lähde (`lahde`)
EI LÖYDY. Kartan 15 tarinapaikan jutuista (maakartat.js, `tarinapaikka: true`) yhdessäkään ei ole sanan bouquin merkitystä. Bukinistit ovat vain Ranskan maalehden nostossa `maalehti-bouquinistit` ("Bouquinistes", maalehtinostot-fra.js; teksti ei kerro nimen alkuperää; ei Pariisin kohdekartan tarinapaikka) ja Pariisin matkakirjan oppitunnissa "Joki, joka virtaa kahden kirjahyllyn välissä" (fokusvirta-pariisi.js; sisältää vastauksen, ei kartan tarinapaikka). Ei keksitty lähdettä.

## Datamuoto (ehdotettu PK:lle, vastaus odottaa)
`tarinakaari.<kaupunki>.kysymys.lahde` = tarinapaikan vakaa tunnus = kohdekartan kohteen `nosto`-kenttä (esim. `hetki-lavoisier-laboratorio-1780`; koneellisesti tarkistettu, ei nimipohjainen, kestää nimiömuutokset); `kysymys.vihje` = yksi virke. Tyhjä = vanha käytös. Ei päätason skeemamuutosta.

## Vaihtoehdot KK:lle (valitse yksi; kumpikaan ei ole vielä dataa)
A. UUSI TARINAPAIKKA "Bukinistit 1859 — laatikot pääsevät kaiteelle" (Quai Voltaire, 48,859 N / 2,33075 E, esittelypaikoista; merkki tiimalasi). Juttu valmiista hyväksytystä aineistosta: oppitunnin faktat (bouquin = vanha kirja, 1500-luvun ammattikunta, 1859 lupa kiinteille laatikoille, pysyvä lukitus 1891; isoisän aikaan laatikot kannettiin pois joka ilta). Sama visa kuin nyt ei toistu sanasta sanaan. Luonteva, koska Colette on jo kuvattu ja 1873 on isoisän aikaan.
  Luonnos `vihje`: "Kysyn sinulta Seinen rannan kirjakauppiaista. Etsi tiimalasi Quai Voltairen rantamuurilta."
  Vaatii: nosto + nähtävyysjuttu + kohdekartan kohde (`nosto: nosto-pariisin-bukinistit`) + kuva (Commons-kuva on jo oppitunnissa) + äänijono; testit.
B. VAIHDETAAN KYSYMYS yhdeksi, jonka vastaus on jo tarinapaikan jutussa (esim. Lavoisier: miten hän osoitti ettei mikään katoa → vaaka; vihje: "Kysyn sinulta eräästä keksinnöstä. Etsi lamppu Arsenaalin kohdalta."). Colette-hahmo ja bukinistikohtaaminen pitäisi sovittaa uuteen kysymykseen.
C. Jätetään Pariisin vihje pois (vanha käytös), kunnes A tai B on tehty.
SUOSITUS: A.

## TOTEUTETTU 12.11.2026 (KK 20.52: vaihtoehto A)
Tarinapaikka "Bukinistit 1859" (nosto-pariisin-bukinistit, Quai Voltaire 48,859 N / 2,33075 E, tiimalasi) + tarinakaaren Pariisi-kysymykseen `lahde: nosto-pariisin-bukinistit` ja `vihje`. Miniatyyri: ämpäritunnus pariisi-bukinistit-1859 (kuvaa ei generoitu; puuttuva kuva = varatäplä). Äänijonoon 3 riviä.
