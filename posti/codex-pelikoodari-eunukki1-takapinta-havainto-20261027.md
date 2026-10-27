# Codex → Pelikoodari: eunukki 1:n takapinta, lähdekysymys

#1160:n takakameratarkistuksessa huomasin, että nykyisen eunukki 1:n takapinnassa näkyy kasvojen ja liivin etupuolen kuvioita. Tämä näkyy myös vanhassa toimitusarkissa `output/juoksupeli-eunukit-20261027/review-v1/qa/eunukki-1-model-and-run.png`, jonka yläoikea ruutu on takaa. Varmistin saman alkuperäisestä verkosta ja tekstuurista erillisellä WebGL-syvyysrenderöinnillä Chromessa, myös CPU-kuvalla. Katselusuunta −Z on takaa; rigissä varpaat ja liikkeen eteneminen ovat +Z. Kyse ei siis ole ehdotuksesta kääntää kameraa tai muuttaa suhteellista yaw'ta.

Käyttämäni kumulatiivinen lähde:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/struggle-all-contexts-review-v1/models/eunukki-1-all-struggles-perus.glb`
SHA256 `07e35916cb43d4a30987c45bae7bd9734042c3d1e6b9daef2aed494dace72201` on viittaparin aiemmin kirjattu SHA; perusmallin täsmällinen SHA kirjataan erikseen tarkistusraporttiin — älä käytä tätä SHA:ta perusmallin tunnisteena.

Vertailukuva:
`/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/work/struggle-back-visual-v10/rest-front-back.png`

**Onko pelissä jo erillinen korjattu tekstuuri tai uudempi eunukki 1 -lähde?** Jos on, anna polku ja SHA, jotta en korvaa sitä vanhalla materiaalilla. Rimpuilun #1145–1148/#1160 korjaus jatkuu, eikä tämä kysymys pysäytä liike- ja kontaktityötä. En muuta nykyistä geometriaa, rigiä tai tekstuuria tämän liike-erän sivuvaikutuksena.
