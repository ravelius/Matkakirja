// ISS 3D-mallina kyydin seurannassa (Linssisepän suositus docs/raportit/iss-kyyti-suositus-20260928.md): oma proseduraalinen
// low-poly-malli kärkiväreillä (CC0, ei kuvista kopioitua pintaa), Malli-varjostimella kuten elävät elementit.
// Mittasuhteet todellisesta asemasta (NASA: ristikko 109 m, aurinkopaneelisiivet 35 × 12 m, paineistetut moduulit noin 70 m):
//   X = ristikon suunta (sivulle radasta), Z = lentosuunta, Y = zeniitti (poispäin maasta). Yksikkö on metri.
//   - ristikko: harmaa palkki 100 × 2,6 × 2,6 m
//   - aurinkopaneelit: neljä paria siipiä ristikon päissä (x = ±31 ja ±46), kullanruskeat, lentosuunnassa eteen ja taakse
//   - moduulit: valkoinen jono lentosuunnassa ristikon alla (Destiny, Unity, Zvezda …) ja kaksi sivumoduulia (Columbus, Kibo)
//   - radiaattorit: vaaleat paneelit ristikosta alas (x = ±15)
// Kolmioita 12 laatikkoa × 12 = 144 + 8 siipeä × 4 = 176. Liioittelu pelikokoon tehdään skaalalla (AstronauttiKerros).
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class IssMalli
    {
        /// <summary>Mallin leveys metreinä (paneelien kärjestä kärkeen ristikon suunnassa), skaalaa varten.</summary>
        public const float Leveys = 110f;

        static readonly Color32 Ristikko = new Color32(0x9c, 0x9a, 0x94, 0xff);
        static readonly Color32 Paneeli = new Color32(0xb4, 0x86, 0x3a, 0xff);
        static readonly Color32 Moduuli = new Color32(0xe8, 0xe6, 0xdf, 0xff);
        static readonly Color32 Radiaattori = new Color32(0xf2, 0xf2, 0xee, 0xff);

        public static Mesh Rakenna()
        {
            var p = new List<Vector3>();
            var n = new List<Vector3>();
            var c = new List<Color32>();
            var t = new List<int>();

            Laatikko(p, n, c, t, new Vector3(0, 0, 0), new Vector3(100, 2.6f, 2.6f), Ristikko);
            // Moduulijono lentosuunnassa ristikon alla ja sivumoduulit.
            Laatikko(p, n, c, t, new Vector3(0, -4.5f, 4), new Vector3(4.4f, 4.4f, 62), Moduuli);
            Laatikko(p, n, c, t, new Vector3(0, -4.5f, -32), new Vector3(4.2f, 4.2f, 14), Moduuli);
            Laatikko(p, n, c, t, new Vector3(-7, -4.5f, 28), new Vector3(10, 4.2f, 4.2f), Moduuli);
            Laatikko(p, n, c, t, new Vector3(8.5f, -4.5f, 28), new Vector3(13, 4.4f, 4.4f), Moduuli);
            Laatikko(p, n, c, t, new Vector3(0, -9.5f, 10), new Vector3(4, 5, 4), Moduuli);
            // Radiaattorit ristikosta alas.
            foreach (float x in new[] { -15f, 15f })
                Laatikko(p, n, c, t, new Vector3(x, -9, 0), new Vector3(12, 16, 0.4f), Radiaattori);
            // Paneelien kiinnityslaatikot ja siivet (eteen ja taakse).
            foreach (float x in new[] { -46f, -31f, 31f, 46f })
            {
                Laatikko(p, n, c, t, new Vector3(x, 0, 0), new Vector3(3, 3.2f, 3.2f), Ristikko);
                foreach (float suunta in new[] { -1f, 1f })
                    Siipi(p, n, c, t, x, suunta);
            }

            var m = new Mesh { name = "ISS" };
            m.SetVertices(p);
            m.SetNormals(n);
            m.SetColors(c);
            m.SetTriangles(t, 0);
            m.RecalculateBounds();
            return m;
        }

        /// <summary>Aurinkopaneelisiipi: taso 12 × 35 m, alkaa 2 m:n päästä ristikosta (Cull Off, joten molemmat puolet).</summary>
        static void Siipi(List<Vector3> p, List<Vector3> n, List<Color32> c, List<int> t, float x, float suunta)
        {
            int a = p.Count;
            float z0 = 2f * suunta, z1 = 37f * suunta;
            p.Add(new Vector3(x - 6, 0, z0)); p.Add(new Vector3(x + 6, 0, z0));
            p.Add(new Vector3(x - 6, 0, z1)); p.Add(new Vector3(x + 6, 0, z1));
            for (int i = 0; i < 4; i++) { n.Add(Vector3.up); c.Add(Paneeli); }
            t.AddRange(new[] { a, a + 2, a + 1, a + 1, a + 2, a + 3 });
        }

        static void Laatikko(List<Vector3> p, List<Vector3> n, List<Color32> c, List<int> t, Vector3 keski, Vector3 koko, Color32 vari)
        {
            var h = koko * 0.5f;
            var akselit = new[] { Vector3.right, Vector3.left, Vector3.up, Vector3.down, Vector3.forward, Vector3.back };
            foreach (var nn in akselit)
            {
                // Tahkon kaksi muuta akselia.
                Vector3 u = Mathf.Abs(nn.y) > 0.5f ? Vector3.right : Vector3.up;
                Vector3 v = Vector3.Cross(nn, u);
                Vector3 kp = keski + Vector3.Scale(nn, h);
                Vector3 uu = Vector3.Scale(u, h), vv = Vector3.Scale(v, h);
                int a = p.Count;
                p.Add(kp - uu - vv); p.Add(kp + uu - vv); p.Add(kp - uu + vv); p.Add(kp + uu + vv);
                for (int i = 0; i < 4; i++) { n.Add(nn); c.Add(vari); }
                t.AddRange(new[] { a, a + 2, a + 1, a + 1, a + 2, a + 3 });
            }
        }
    }
}
