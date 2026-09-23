# Luovutus: Sisältökirjuri — 2026-09-23 (konteksti 72%, Fablen pyytämä nollaus)

## Valmiit ja pushatut tänään (PR:t auki, ei vielä mergetty)

- **PR #2927** — 163 kaupungin pallopisteet (js/packs/maailmankartta-pallopisteet.js), kaikki 266 kaupunkia saavat pallopisteen.
- **PR #2930** — Camargue + Dune du Pilat maastokohteet-fra.js:ään (ei fokuskohteet-fra.js:ään — löysin kaksoismerkintäriskin, 8/10 Fablen nimeämästä kohteesta oli jo kartalla).
- **PR #2935** — 5 mediaviitteen puuttuvat lisenssit (Siirtosepän pyyntö).
- **PR #2961** — Aikaleimojen kohdistus: kohdista-luennat.mjs hyväksyy nyt kuitin oman outputFormatin (kaikki vanhat kuitit 128kbps vs. nykyinen 192kbps-vakio), JA kaikki 45/45 matkakirjaluennan aikaleimaa kohdistettu nykyiseen ääneen+tekstiin, viety R2:een CI:n omana osana (varmistettu HTTP 200). **EI vaadi Julkaisijalta erillistä R2-vientiä.**

Kaikki neljä: node --test 0 fail (samat 3 pre-existing trim-narration-epäonnistumista).

## Kesken: Afrikan O7-paketti (10 kaupunkia, ensimmäinen erä 4 kaupunkia)

Neljä rinnakkaista Opus-agenttia kirjoitti kaupunkilehden näille kaupungeille — KOLME VALMISTA, YKSI KESKEN:

| Kaupunki | Tila | Worktree | Branch | Commit |
|---|---|---|---|---|
| Murzuk | ✅ valmis | `/Users/Shared/Claude/Matkakirja-fable/.claude/worktrees/agent-ae0dd6e2d14d9a573` | `worktree-agent-ae0dd6e2d14d9a573` | `47468195e` |
| Al Kufra | ✅ valmis | `/Users/Shared/Claude/Matkakirja-fable/.claude/worktrees/agent-a4817b44e530c416d` | `worktree-agent-a4817b44e530c416d` | `a8d75b6e3` |
| Gao | ✅ valmis | `/Users/Shared/Claude/Matkakirja-fable/.claude/worktrees/agent-a55ff3155f6307f01` | `worktree-agent-a55ff3155f6307f01` | `fe9012d0b` |
| Karthago | 🟡 kesken | `/Users/Shared/Claude/Matkakirja-fable/.claude/worktrees/agent-a02ad1f353a629a6d` | `worktree-agent-a02ad1f353a629a6d` | ei vielä committoitu |

Karthago: sisältö kirjoitettu (kansi 7 nostoa + kuvataide 4 nostoa), oma faktatarkistaja löysi pari pientä ristiriitaa (Caton vierailun vuosiluku 152 vs. 157 eaa., Magentan hautakivien lukumäärä 2170 vs. 2080), agentti oli soveltamassa korjauksia ennen committia kun konteksti loppui. **Seuraava sessio: jatka agenttia (`SendMessage to: a02ad1f353a629a6d`) tai tarkista worktree käsin ja committoi.**

**Ei mitään näistä neljästä ole pushattu eikä koottu PR:ksi.** Kukin worktree/branch on erillinen — seuraavan session pitää:
1. Varmistaa Karthago valmiiksi (committoituna).
2. Koota kaikki neljä yhteen (esim. cherry-pick tai merge yhteen haaraan `sisalto-afrikka-o7-era1-20260923`, pohjana tuore origin/main).
3. Ajaa `node --test` + `node tools/tarkista-kaksoisavaimet.mjs` koko erälle yhdessä (kukin agentti testasi vain omansa — tarkista ettei kahdesti sama Commons-kuva/id).
4. Yksi PR, ilmoitus Julkaisijalle.

Kaikki neljä käyttivät samaa mallia: kansi (`id: 'kaupunki'`) + 1 aihesivu, koska `tests/lehdet.test.mjs` vaatii kannen jokaiselle lehdelle. `tools/kirjoita-kategoriat.mjs`:ää EI käytetty (se kirjoittaisi koko tiedoston uusiksi ja pudottaisi muiden kaupunkien kentät) — lohkot lisätty käsin tiedoston loppuun (creation-order, ei aakkosjärjestys). `africa-kulttuuri.js`:n vastaavat lohkot jätetty vain `kysymys`-kentällä (nostot siirtyivät kategorioihin).

O7-paketin loput 6 kaupunkia (kimberley, mosambik, suakin, rashafun, viktorianputoukset, kilimandzaro) odottavat toista erää — ks. docs/tyolista-opukselle.md.

## Seuraavaksi (Fablen priorisointi 23.9.2026 illalla)

1. Kun Siirtosepän `natiivi-siirtosuunnitelma-20260923.md` valmistuu: tarkista siitä pelattavuutta estävät sisältöpuutteet (esim. kaupungit ilman lehteä/kohdekarttaa pelattavien maiden reiteillä) ja aseta ne jonon kärkeen ennen muuta.
2. Afrikan O7 loppuun (yllä).
3. Kohdekartat puuttuvilta kaupungeilta (83/266 puuttuu, ks. aiempi analyysi).

## Muuta huomioitavaa

- Natiivi on nyt omistajan sitova etusija (web ylläpitoon) — kirjoita sisältö vain js/packs-rakenteeseen, ei web-erityisiä DOM-ratkaisuja.
- Kaikki kansiot ovat `/Users/Shared/Claude/`-alueella; worktreet `tools/uusi-worktree.sh`:lla jatkossa (ei käytetty tässä sessiossa Agent-työkalun oman `isolation: worktree`-mekanismin takia, joka luo omat `.claude/worktrees/agent-*`-kansionsa).
