# Sisältökirjuri: luovutus 28.10.2026

Tila: Suomen maakuntatekstit (koko maakunta ensin) mergattu; Ruotsi, Norja, Tanska ja Viro PR:nä odottamassa KK:n kuittausta. Resepti ja työkalut: docs/tuotanto/reseptit/maakuntateksti-koko-maakunta.md, tools/sisalto/maakuntateksti-aseta.mjs, tools/sisalto/kohdesijainnit.mjs.

## Valmiina / PR:t
- Suomi 18 maakuntaa: PR 5391 mergattu (74de34a01). Kainuu: kolmanneksi suurin, Kuhmon "tiheä karhu- ja susikanta".
- Odottavat KK-kuittausta (merge kuittauksella, JS-PR:ssä CI ~15 min): Ruotsi 21 lääniä PR 5449; Norja 21 aluetta PR 5452; Tanska 5 aluetta PR 5454; Viro 15 maakuntaa PR 5455. Luettavissa docs/raportit/maakuntatekstit-<maa>-20261028.md.
- Kohdekarttapisteet (NUI/PT 28.10.): raportti docs/raportit/nahtavyyssijainnit-tarkistus-20261028.md mergattu (PR 5442); 16 pisteen korjaus PR 5450 auki (CI ajossa; Linnanmäki palautettu tests/karttareunus.test.mjs:n takia, Vatikaanin museot ennallaan tests/kohdekarttavarat.test.mjs:n takia). Natiivi käyttää Wikidata-pisteitä, kun ero < 1 km.
- Kuvatekstin kaksoislisenssi: syy Unity Maakunnat.cs:259 KuvanLahde; korjaus annettu NUI:lle (web ok).

## Seuraavaksi (PT 28.10.)
1) Matkan kohdemaat (laudan pysäkkien maat; tarkista laudasta: Ranska, Britannia, Alankomaat, Italia, Saksa jne.), sitten 2) muut Euroopan maat suurimmasta pienimpään. Muut maanosat EI ennen omistajan päätöstä (19.10.). Maa per PR, reseptin työtapa. Pakissa pitka-tekstejä ~685, Suomi–Viro valmiina; jäljellä ~600.

## Aiemmin avoinna (ennen tätä istuntoa)
- Kartan tietokortti (PR 5259, Raamattu 2.203): Karttaseppä toteuttaa; Eton-vedokset tulevat SK:lle tuoreen lukijan arvioon (docs/tuotanto/reseptit/kartan-tietokortti.md). Ei uutta vedosta vastaanotettu tässä istunnossa.
- Paikallinen haara sk-oseania-viitta jää pushaamatta (PT: jätä paikalleen).

## Huomioita
- Worktreet: wt/sisaltokirjuri-maakunnat-{ruotsi,norja,viro-tanska} ja -kohdepisteet voi poistaa mergen jälkeen (`tools/uusi-worktree.sh --poista <rooli>-<aihe>`); poista myös paikalliset haarat.
- Agentit vain Sonnet/Opus; tuore lukija tekee usein virheellisiä faktaväitteitä, tarkista lähteestä ennen kuin muutat.
