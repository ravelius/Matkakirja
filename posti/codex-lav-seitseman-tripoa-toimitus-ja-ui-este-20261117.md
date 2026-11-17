# Codex → LAV: 7/22 aiempaa Tripoa toimitettu T7:llä; napsautus/screenshot-este

Seitsemän mallin tekninen toimitus on varmistettu jaetusta hakemistosta `/Users/Shared/Claude/proto-3d/_valmiit/hyvaksytyt-mallit/` (alikansiot linkittävät T7:lle):
- old-new-synagogue / old-new-synagogue-tripo.glb
- riga-cathedral / riga-cathedral-tripo.glb
- kazan-cathedral / kazan-cathedral-tripo.glb
- savior-spilled-blood / savior-spilled-blood-tripo.glb
- st-sophia-kyiv / st-sophia-kyiv-tripo.glb
- ponte-vecchio / ponte-vecchio-tripo.glb
- santa-croce / santa-croce-tripo.glb

541007752 tavua yhteensä. Kaikilla original.glb, job.json, SHA, technical-qa.json (ei havaittuja teknisiävirheitä), dimensions.json ja tripo-preview.jpg. Täysi jobId/inputSHA/glbSHA/polku-manifesti T7:llä `output/tripo-massavalmistelu-2461-2464-20261116/era3-20261117/tripo/remaining-delivery-first7.json`. Alkuperäiset säilytetty; Downloads-kopiot poistettu vasta arkiston ja jaetunpolun SHA-tarkistuksen jälkeen. Ei uusia generointikuluja näistä latauksista.

Kuuden ensimmäisen rajattu yhden näkymän kuvavertailu: `.../era3-20261117/tripo/downloads-visual-qa-first6.json`. Verikirkossa roikkuvilta näyttäviä kultaisia tukilankoja ja muhkuraisia sipulikupoleita. Sofiassa kulmikkaat kupolit ja kaksi tarkistettavaa huippuristiä (limitys voi peittää). Kazanissa hienolistat epätasaisia. Muissa ei suurta näkyvää etupuolen puutetta. Ei360hyväksyntää. SantaCrocen itsenäinenkuvaQA vieläavoin. Vastaanotto/integraatio eivät ole tällä kuitattuja.

UUSI ESTE: BlueMosquen ja Tukholman näkymissä DOM toimii (jobId/faces luettavissa), mutta sekä Page.captureScreenshot että Input.dispatchMouseEvent aikakatkaisevat toistuvasti. Näkymän normaaliuudelleenlataus ei auttanut. Omistajalta pyydetty vain Samin Chrome+Tripo-ikkunan tuominen näkyviin; ei lupamuutosta/eikä uutta sovellusrestarttia. 15/22 latausta edelleen avoin. Aiempi ensimmäisenExportin ERR_BLOCKED_BY_CLIENT ratkesi normaalilla Export-uusinnalla; se ei ole tämä uusin oire.

Invalides+Sainte-Chapelle näkyvät nyt myös valmiina Tripon Assetsissa. Neljä uutta koristetyötä valmis pilvessä, ei vielä GLB-arkistossa. Garnier-v2-Tripo (1 sallittu) odottaa22latauksen loppua; sen jälkeen B3 (1 sallittu), kuten ohjeistitte. B3 prompt+lähteet valmisteltu mutta0kutsua.
