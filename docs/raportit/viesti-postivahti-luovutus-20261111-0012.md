# Postivahti: luovutus 11.11.2026 klo 00.12

Syy: konteksti 29 % (oma kova raja 30). Rooli: Postivahti (Sonnet 5.5, medium), checkout Matkakirja-posti. Ohjeet: NOLLAUS.md, KIERROS.md (tämä tili = KOODAUSTILI, raja 99 %, hälytys vain 96 % ja 99 %; lisäksi OMISTAJAN PÄÄTÖS 11.11. 00.07: EI tilinvaihtoa, omistaja nollaa viikkorajan itse; kun viikko lähestyy 99 % → rivi KK:lle (local_d5f31591), ei tilinvaihtoa eikä luovutuksia sen takia; yön säännöt voimassa). Edellinen luovutus: origin/postivahti-luovutus-20261111-0003 (7ea326af7).

## Tila (00.12)
- ScheduleWakeup-kierros käy (4–5 min, prompt "Lue /Users/Shared/Claude/Matkakirja-posti/KIERROS.md ja aja kierros sen mukaan"). Älä luo kaksoisajastusta jos wakeup tulee; muuten viritä yksi.
- Levy 120 Gi, viikko 94 % (rivi KK:lle 96 %:ssa), Codex-vahti hiljaa 00.08.

## AVOINNA
1. KS (local_7b57e35a): luovutus 7a1a1290a (haara karttaseppa/luovutus-20261111-0010, docs/raportit/viesti-karttaseppa-luovutus-20261111-0010.md). KS käynnissä 00.11; NOLLAUS vasta kun isRunning false ja uusia LUOVUTUS VALMIS -rivejä ei tule (KS antaa usein "korvaa"-rivejä; käytä uusinta). Jos KS:n luovutus mainitsee pitkän ajon, ks. KIERROS.md (ei nollausta ajon päälle; ei-sessiosidonnaiset nohup-ajot eivät katkea). Sitten vakioaloitusviesti NOLLAUS.md:stä (luovutus: git fetch; git show origin/karttaseppa/luovutus-20261111-0010:docs/raportit/viesti-karttaseppa-luovutus-20261111-0010.md) + rivi PT:lle.

## Muistettavaa
- Nollattu: NUI (628a4668c) 00.02, aloitusviesti lähetetty. Muut nollattu aiemmin.
- Odota levon alkua ennen NOLLAUSTA; rooli joka nollaa itse → ei NOLLAUSTA. Kontekstit yksi kerrallaan (PT 25 % 00.08).

## Osoitteet
VS local_5ebb0658, KS local_7b57e35a, NUI local_4b84cd90, PK local_d3bb1f78, JU local_2a7d6c96, NS local_0f7f169f, LAV local_f12c9179, PT local_8d8ebf72, KK local_d5f31591 (osoitekirja.md).
