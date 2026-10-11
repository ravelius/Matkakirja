// HISTORIAMOOTTORI: TYRMÄN ÄÄNIYMPÄRISTÖ UNITYSSA (Pelikoodari 11.10.2026; PT:n Olavinlinna-yösuunnitelma B3; ajastin Ydin TyrmanAanet).
// Pelissä jo olevat äänet: harvat tapahtumat 20–40 s:n välein pohjan päällä (PT 06.0x, Laitetestaajan 4. kierros) — iso pisara holvista
// (Soundly kaivo-01…06, 2–3 pisaran sarja lähellä), kaukaiset askeleet käytävällä oven takana (Soundly askel-kivi, vartijan askelten
// mikseritasolla) tai metallin kalahdus oven takana (varusteet → Soundly varuste-01…06); avainten kilinä (avainnippu → Soundly avain-07…12), raollaan olevan oven narahdus (sonniss
// puuovi-narina-2) ja irtokiven rapina (kivi-irtoaa). Kaikki 3D:nä kuulokehyksessä (SeikkailuKuulija), joten suunta ohjaa pelaajaa.
// Muurin tippumistausta (SeikkailuSade tippuminen-muuri) jatkuu alla ennallaan. SeikkailuTyrma lisää tämän itselleen.
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuTyrmaAanet : MonoBehaviour
    {
        static readonly string[] Tipat = { "kaivo-01", "kaivo-02", "kaivo-03", "kaivo-04", "kaivo-05", "kaivo-06" };
        /// <summary>Askelia kauempana käytävällä ja väli (s): ohikulku sivusuunnassa oven takana.</summary>
        const int AskelMaara = 8; const float AskelValiS = 0.62f, KaytavaM = 3.5f, OhikulkuM = 7f, TippaKorkeusM = 2.3f;
        /// <summary>Tapahtumien tasot (4. kierros: pohja −30 dB peitti 0,35–0,55:n askeleet ja 0,6–0,9:n pisarat): pisara, askel, metalli.</summary>
        const float PisaraTaso = 1f, AskelPerus = 0.6f, AskelKeski = 0.3f, MetalliTaso = 0.7f;
        /// <summary>Tyrmän pohja (olavinlinna-soundly-v2 linna-tila-01 "Underground, Dungeon, Dark, Water Droplets, Constant Hum",
        /// −23 LUFS, 2D-silmukka) ja sen taso; simu 1a7ebdf2c: tyrmä −38,6 dB ilman sitä, tavoite (PT) −32…−30 dB.</summary>
        const string Pohja = "linna-tila-01"; const float PohjaTaso = 0.9f, PohjaNousuS = 2f;
        AudioSource pohja;

        SeikkailuTyrma tyrma; TyrmanAanet ajastin;
        readonly List<TyrmanAani> soitettavat = new List<TyrmanAani>();
        Vector3 istuin, ovi, rako, avaimet, ryomi;
        System.Action<string> kirjaa; bool kirjattu;

        public void Alusta(SeikkailuTyrma t, Vector3 istuin, Vector3 ovi, Vector3 rako, Vector3 avaimet, Vector3 ryomi, System.Action<string> kirjaa)
        {
            tyrma = t; this.istuin = istuin; this.ovi = ovi; this.rako = rako; this.avaimet = avaimet; this.ryomi = ryomi; this.kirjaa = kirjaa;
            ajastin = new TyrmanAanet(Random.Range(0, int.MaxValue));
        }

        void Update()
        {
            if (tyrma == null || ajastin == null) return;
            var y = tyrma.Ydin;
            Pohjaa(y.Vaihe != TyrmanVaihe.Ulkona);
            ajastin.Paivita(Time.deltaTime, y.Muunnelma, y.Vaihe, y.Aika, soitettavat);
            foreach (var a in soitettavat) Soita(a);
        }

        void Pohjaa(bool paalla)
        {
            if (pohja == null)
            {
                var klippi = SeikkailuAanet.Klippi(Pohja); if (klippi == null || !paalla) return;   // pankki vielä latautumassa
                pohja = gameObject.AddComponent<AudioSource>();
                pohja.clip = klippi; pohja.loop = true; pohja.spatialBlend = 0f; pohja.playOnAwake = false; pohja.volume = 0f;
                pohja.time = Random.Range(0f, Mathf.Max(0f, klippi.length - 0.1f));
                SaumatonSilmukka.Kiinnita(pohja);
                pohja.Play();
            }
            float taso = SeikkailuAanet.MikserinTaso(Pohja);
            float nyt = pohja.volume / Mathf.Max(taso, 1e-4f);
            pohja.volume = Mathf.MoveTowards(nyt, paalla ? PohjaTaso : 0f, Time.unscaledDeltaTime / PohjaNousuS) * taso;
        }

        void Soita(TyrmanAani a)
        {
            if (!kirjattu) { kirjattu = true; kirjaa?.Invoke("seikkailu: tyrmän ääniympäristö päällä"); }
            float r = (float)ajastin.Satunnainen();
            switch (a)
            {
                case TyrmanAani.Tippa:
                {
                    // Satunnainen kohta holvissa 1–2,5 m pelaajan istuimesta: 2–3 isoa pisaraa samasta kohdasta (sävel 0,85–1,1),
                    // selvästi pohjan tippojen yläpuolella.
                    float kulma = r * Mathf.PI * 2f, m = 1f + 1.5f * (float)ajastin.Satunnainen();
                    var paikka = istuin + new Vector3(Mathf.Cos(kulma) * m, TippaKorkeusM, Mathf.Sin(kulma) * m);
                    StartCoroutine(Pisarat(paikka, ajastin.Satunnainen() < 0.5 ? 2 : 3));
                    break;
                }
                case TyrmanAani.Askeleet: StartCoroutine(Ohikulku(r < 0.5f)); break;
                case TyrmanAani.Metalli:
                {
                    // Vartijan varusteet kalahtavat käytävällä oven takana, sivussa (ei näy): kaukainen ja tumma.
                    var ulos = ovi - istuin; ulos.y = 0; ulos = ulos.sqrMagnitude > 1e-4f ? ulos.normalized : Vector3.forward;
                    var sivu = Vector3.Cross(Vector3.up, ulos) * (r < 0.5f ? 1f : -1f);
                    SeikkailuAanet.Soita("varusteet", ovi + ulos * KaytavaM + sivu * 2.5f + Vector3.up, MetalliTaso, 0.85f + 0.1f * (float)ajastin.Satunnainen());
                    break;
                }
                case TyrmanAani.AvainRaossa: SeikkailuAanet.Soita("avainnippu", rako, 0.55f); break;
                case TyrmanAani.AvainOlissa: SeikkailuAanet.Soita("avainnippu", avaimet + Vector3.up * 0.1f, 0.3f, 1.1f); break;
                case TyrmanAani.OviVeto: SeikkailuAanet.SoitaJokin(SeikkailuAanet.OviNarina, "ovi-narahdus", ovi + Vector3.up, 0.3f, 0.9f); break;
                case TyrmanAani.KiviRapina: SeikkailuAanet.Soita("kivi-irtoaa", ryomi + Vector3.up * 0.3f, 0.3f, 1.25f); break;
            }
        }

        /// <summary>Isot pisarat samasta kohdasta holvissa 0,4–0,9 s:n välein.</summary>
        System.Collections.IEnumerator Pisarat(Vector3 paikka, int maara)
        {
            for (int i = 0; i < maara; i++)
            {
                SeikkailuAanet.Soita(Tipat[(int)(ajastin.Satunnainen() * Tipat.Length) % Tipat.Length], paikka, PisaraTaso, 0.85f + 0.25f * (float)ajastin.Satunnainen());
                yield return new WaitForSeconds(0.4f + 0.5f * (float)ajastin.Satunnainen());
            }
        }

        /// <summary>Vartija kulkee käytävällä oven takana sivusuunnassa (vasemmalta oikealle tai päinvastoin), ei pysähdy.</summary>
        System.Collections.IEnumerator Ohikulku(bool vasemmalta)
        {
            var ulos = ovi - istuin; ulos.y = 0; ulos = ulos.sqrMagnitude > 1e-4f ? ulos.normalized : Vector3.forward;
            var sivu = Vector3.Cross(Vector3.up, ulos) * (vasemmalta ? 1f : -1f);
            var keski = ovi + ulos * KaytavaM;
            for (int i = 0; i < AskelMaara; i++)
            {
                var klippi = SeikkailuAanet.Askel("kivi", false) ?? SeikkailuVartijat.AskelKlippi;
                if (klippi == null) yield break;
                float osuus = i / (float)(AskelMaara - 1);
                var l = SeikkailuKuulija.Lahde("Tehoste:" + SeikkailuVartijat.VartijanAskeleet, 2f, 25f);
                SeikkailuKuulija.Aseta(l, keski + sivu * Mathf.Lerp(-OhikulkuM, OhikulkuM, osuus) * 0.5f);
                // Kaukana ja holvin takana: hiljainen ja tumma (sävel alas), keskellä kuuluvin.
                l.clip = klippi; l.pitch = 0.88f; l.volume = (AskelPerus + AskelKeski * Mathf.Sin(osuus * Mathf.PI)) * SeikkailuAanet.Taso("tehosteet", SeikkailuVartijat.VartijanAskeleet);
                l.Play(); Destroy(l.gameObject, klippi.length / l.pitch + 0.2f);
                yield return new WaitForSeconds(AskelValiS);
            }
        }
    }
}
