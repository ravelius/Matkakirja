// SADE (omistajan palaute 8.10. (2), Siirtoseppä): Pelikoodarin aanet-saa-v1-silmukat (−23 LUFS, sauma valmiina, loop ilman
// ristihäivytystä) kaksiulotteisina taustoina ☰-mikserin sää- tai maisemaryhmässä (äänirekisteri, SeikkailuAanet.MikserinTaso). Tila pelaajan kävelyosasta
// (pienin osa, jonka rajoihin pelaaja osuu) ja sen märkyydestä (LR v45f): ulkona (märkyys ≥ 0,5) sade kivelle ja tippuminen
// räystäiltä, veden äärellä (≥ 0,8 tai veneessä) sade veteen, puupinnan lähellä (pinta-merkki puu*, 6 m) sade puulle, veneessä
// sade pressulle; sisällä sade kuuluu vaimeana ja vesi tippuu muurista. Kaukainen ukkonen aina hiljaa. Liukuva siirtymä 1,5 s.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuSade : MonoBehaviour
    {
        public static SeikkailuSade Aktiivinen { get; private set; }
        /// <summary>Korkean tuulen raja (m, Unity y): muurin harja ja tornin yläosa ulkona (piha ~0, harja ~10–12).</summary>
        public const float KorkeallaY = 8.5f;
        internal static readonly string[] Tunnukset = { "sade-kivi", "sade-vesi", "sade-puu", "sade-pressu", "tippuminen-raystas", "tippuminen-muuri", "ukkonen-jyly",
            "tuuli-kostea", "tuuli-korkea",   // Sonniss-tuulet (Pelikoodari 9.10., ämpärissä sonniss-tuulet-v1)
            "tuuli-metsa",   // männikön tuuli muurin ulkopuolella (sonniss-aanet-v2, PT 9.10.)
            "yolinnut", "koira",
            "kesayo-sirkat", "satama-vesi" };   // sonniss-aanet-v3 (PT 9.10.): kesäyön sirkat ulkona, vesi loiskii kallioon rannalla ja veneessä   // elokuun yön linnut ja kaukainen koira (aanet-lapi-v1, Pelikoodari 9.10.; Tausta-voima)
        readonly Dictionary<string, AudioSource> lahteet = new Dictionary<string, AudioSource>();
        readonly Dictionary<string, float> tavoite = new Dictionary<string, float>();
        float tarkistusT;

        public static void Luo(Transform isa)
        {
            Poista();
            var go = new GameObject("Seikkailu sade");
            go.transform.SetParent(isa, false);
            Aktiivinen = go.AddComponent<SeikkailuSade>();
        }

        public static void Poista() { var s = Aktiivinen; Aktiivinen = null; if (s != null) Destroy(s.gameObject); }

        /// <summary>Tavoitevoimakkuudet (0–1 ennen Sää-voimaa) pelaajan paikasta; testattava ilman Unityä ei ole tarpeen (puhdas taulukko).</summary>
        public static void Tavoitteet(double markyys, bool veneessa, bool puulla, IDictionary<string, float> ulos, bool korkealla = false, bool ulkopuolella = false)
        {
            bool ulkona = veneessa || markyys >= 0.5;
            bool vesi = veneessa || markyys >= 0.8;
            ulos["sade-kivi"] = ulkona && !veneessa ? 0.75f : 0.16f;
            ulos["sade-vesi"] = vesi ? (veneessa ? 0.8f : 0.55f) : 0f;
            ulos["sade-puu"] = puulla && !veneessa ? 0.6f : 0f;
            ulos["sade-pressu"] = veneessa ? 0.85f : 0f;
            ulos["tippuminen-raystas"] = ulkona && !veneessa ? 0.35f : 0f;
            ulos["tippuminen-muuri"] = ulkona ? 0f : markyys > 0 ? 0.5f : 0.28f;
            ulos["ukkonen-jyly"] = ulkona ? 0.45f : 0.3f;
            // Kostea tuuli sateen ja yön alla (ulkona ja veneessä, sisällä vaimeana), korkea tuuli muurin harjalla ja tornissa.
            // Männikkö (rannan mäntymetsä, laituri, muurin ulkopuoli; veneessä hento): kostea tuuli väistyy samassa suhteessa, ettei
            // kaksi laajaa tuulta kerrostu; muurin harjalla korkea tuuli hallitsee ja metsä jää taustalle; pihalla tuskin kuuluvissa.
            float metsa = veneessa ? 0.2f : korkealla ? 0.2f : ulkopuolella ? 0.45f : ulkona ? 0.1f : 0f;
            ulos["tuuli-metsa"] = metsa;
            ulos["tuuli-kostea"] = (veneessa ? 0.5f : ulkona ? 0.4f : 0.1f) * (1f - 0.6f * metsa / 0.45f);
            ulos["tuuli-korkea"] = korkealla && !veneessa ? 0.55f : 0f;
            // Yön elämä ulkona (huuhkaja, kaukainen koira rannalta) sateen alla hiljaa; sisällä tuskin kuuluvissa.
            ulos["yolinnut"] = ulkona ? (korkealla ? 0.4f : 0.3f) : 0.06f;
            ulos["koira"] = veneessa ? 0.25f : ulkona ? 0.18f : 0f;
            ulos["kesayo-sirkat"] = ulkona && !korkealla ? 0.22f : 0f;
            ulos["satama-vesi"] = veneessa ? 0.4f : vesi ? 0.35f : ulkopuolella ? 0.15f : 0f;
        }

        /// <summary>Kävelyosa muurin ulkopuolella (ranta, vesiportti, laituri, ulkoalue; LR:n osat v45x).</summary>
        public static bool MuurinUlkopuolella(string osa) => osa != null && (osa == "vesiportti" || osa == "ulkoalue" || osa.StartsWith("ranta", StringComparison.Ordinal)
            || osa.StartsWith("laituri", StringComparison.Ordinal));

        void Update()
        {
            float dt = Time.unscaledDeltaTime;
            if (Time.unscaledTime >= tarkistusT)
            {
                tarkistusT = Time.unscaledTime + 0.5f;
                var p = SeikkailuPelaaja.Aktiivinen;
                bool veneessa = p == null && SeikkailuVene.Aktiivinen != null;
                double markyys = 0; bool puulla = false, ulkopuolella = false;
                var d = SeikkailuKavely.Data;
                if (p != null && d != null)
                {
                    var pos = p.transform.position; double x = pos.x, y = pos.y, z = -pos.z, pienin = double.MaxValue;
                    foreach (var o in d.Osat.Values)
                    {
                        if (x < o.RajatMin[0] - 0.5 || x > o.RajatMax[0] + 0.5 || z < o.RajatMin[2] - 0.5 || z > o.RajatMax[2] + 0.5 || y < o.RajatMin[1] - 1 || y > o.RajatMax[1] + 1) continue;
                        double tilavuus = (o.RajatMax[0] - o.RajatMin[0]) * (o.RajatMax[1] - o.RajatMin[1] + 1) * (o.RajatMax[2] - o.RajatMin[2]);
                        if (tilavuus < pienin) { pienin = tilavuus; markyys = o.Markyys; ulkopuolella = MuurinUlkopuolella(o.Id); }
                    }
                    foreach (var m in d.Merkit)
                        if (m.Laji == "pinta" && m.Tunnus != null && m.Tunnus.StartsWith("puu", StringComparison.Ordinal)
                            && (m.X - x) * (m.X - x) + (m.Z - z) * (m.Z - z) < 36 && Math.Abs(m.Y - y) < 3) { puulla = true; if (m.Markyys > markyys) markyys = m.Markyys; break; }
                }
                bool korkealla = p != null && markyys >= 0.5 && p.transform.position.y > KorkeallaY;
                Tavoitteet(markyys, veneessa, puulla, tavoite, korkealla, ulkopuolella);
            }
            foreach (var t in Tunnukset)
            {
                float taso = SeikkailuAanet.MikserinTaso(t);   // äänirekisteri: sää- tai maisemaryhmä × äänen kerroin
                tavoite.TryGetValue(t, out var v);
                if (!lahteet.TryGetValue(t, out var l) || l == null)
                {
                    if (v <= 0f) continue;
                    var klippi = SeikkailuAanet.Muunnelma(t) ?? SeikkailuAanet.Klippi(t); if (klippi == null) continue;   // manifest vielä latautumassa; Soundly-korvaaja ensin
                    l = gameObject.AddComponent<AudioSource>();
                    l.clip = klippi; l.loop = true; l.spatialBlend = 0f; l.playOnAwake = false; l.volume = 0f;
                    l.time = UnityEngine.Random.Range(0f, Mathf.Max(0f, klippi.length - 0.1f));   // silmukat eri kohdista, ei yhtäaikaisia saumoja
                    SaumatonSilmukka.Kiinnita(l);   // saumaton: iOS-FMOD:n kooderiviive ja täyte eivät soi (juna 174)
                    l.Play(); lahteet[t] = l;
                }
                float nyt = l.volume / Mathf.Max(taso, 1e-4f);
                nyt = Mathf.MoveTowards(nyt, v, dt / 1.5f);
                l.volume = nyt * taso;
            }
        }
    }
}
