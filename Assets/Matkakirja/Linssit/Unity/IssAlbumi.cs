// PELAAJAN ISS-KUVA-ALBUMI (omistaja 4.10.2026 klo 15.2x: kuva näkyy heti Cupolassa isona, pienenee vasemman alareunan
// pikkukuvapinoon ja myöhemmin Matkalaukun Julisteisiin; Natiivi-UI tekee ikkunan ja pinon, Julisteet lukee saman albumin).
// Jokaisesta valmiista kuvasta (IssKameraKuva.KuvaValmis, molemmat polut) persistentDataPath/iss-albumi/:
//   <id>.jpg            kuva (IssKameraKuva)              <id>.json   kuvan tekniset tiedot (juliste, lähde)
//   <id>-pieni.jpg      pikkukuva, pidempi sivu 256 px     <id>-albumi.json  albumin yhtenäiset kentät (alla)
// albumi.json-kentät: {"id","kuva","pieni","paikka","maa","aika_utc","lat","lon","kuvateksti","lahde"}; Lista() uusin ensin.
// Kuviin tallennus erikseen (MatkakirjaValokuva), joten albumi on pelin oma kopio Julisteita varten.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class IssAlbumi
    {
        public sealed class Kuva
        {
            public string Id, Polku, Pikkukuva, Paikka, Maa, Kuvateksti, Lahde;
            public DateTime Utc;
            public double Lat, Lon;
        }

        public const int PikkukuvaPx = 256;
        public static string Kansio => Path.Combine(Application.persistentDataPath, "iss-albumi");

        /// <summary>Kaikki pelaajan kuvat uusin ensin (puuttuva kuvatiedosto ohitetaan).</summary>
        public static List<Kuva> Lista()
        {
            var r = new List<Kuva>();
            if (!Directory.Exists(Kansio)) return r;
            foreach (var f in Directory.GetFiles(Kansio, "*-albumi.json"))
            {
                try
                {
                    var o = Matkakirja.Peli.MiniJson.Jasenna(File.ReadAllText(f)) as Dictionary<string, object>;
                    if (o == null) continue;
                    string T(string k) => Matkakirja.Peli.MiniJson.Kentta(o, k) as string;
                    double L(string k) => Matkakirja.Peli.MiniJson.Kentta(o, k) is object v ? Convert.ToDouble(v, CultureInfo.InvariantCulture) : double.NaN;
                    var k = new Kuva
                    {
                        Id = T("id"), Polku = Path.Combine(Kansio, T("kuva") ?? ""), Paikka = T("paikka") ?? "", Maa = T("maa") ?? "",
                        Kuvateksti = T("kuvateksti") ?? "", Lahde = T("lahde") ?? "", Lat = L("lat"), Lon = L("lon"),
                        Utc = DateTime.TryParse(T("aika_utc"), CultureInfo.InvariantCulture, DateTimeStyles.AdjustToUniversal | DateTimeStyles.AssumeUniversal, out var u) ? u : File.GetLastWriteTimeUtc(f),
                    };
                    string pieni = T("pieni");
                    k.Pikkukuva = string.IsNullOrEmpty(pieni) ? k.Polku : Path.Combine(Kansio, pieni);
                    if (File.Exists(k.Polku)) r.Add(k);
                }
                catch (Exception e) { Debug.LogWarning($"MATKAKIRJA iss-albumi: {Path.GetFileName(f)}: {e.Message}"); }
            }
            r.Sort((a, b) => b.Utc.CompareTo(a.Utc));
            return r;
        }

        /// <summary>Lisää valmiin kuvan albumiin: pikkukuva ja albumitiedot (IssKameraKuva.KuvaValmis). Palauttaa albumin kuvan.</summary>
        public static Kuva Lisaa(IssKameraKuva.OmaKuva k, string lahde)
        {
            string id = Path.GetFileNameWithoutExtension(k.Polku);
            string pieni = id + "-pieni.jpg";
            try { TeePikkukuva(k.Polku, Path.Combine(Kansio, pieni)); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA iss-albumi: pikkukuva: " + e.Message); pieni = null; }
            var ic = CultureInfo.InvariantCulture;
            string J(string s) => (s ?? "").Replace("\\", "\\\\").Replace("\"", "\\\"");
            File.WriteAllText(Path.Combine(Kansio, id + "-albumi.json"), string.Format(ic,
                "{{\"id\":\"{0}\",\"kuva\":\"{1}\",\"pieni\":\"{2}\",\"paikka\":\"{3}\",\"maa\":\"{4}\",\"aika_utc\":\"{5:yyyy-MM-ddTHH:mm:ssZ}\"," +
                "\"lat\":{6:0.0000},\"lon\":{7:0.0000},\"kuvateksti\":\"{8}\",\"lahde\":\"{9}\"}}",
                J(id), J(Path.GetFileName(k.Polku)), J(pieni ?? ""), J(k.Paikka), J(k.Maa), k.Utc, k.Lat, k.Lon, J(k.Kuvateksti), J(lahde)));
            return new Kuva { Id = id, Polku = k.Polku, Pikkukuva = pieni != null ? Path.Combine(Kansio, pieni) : k.Polku, Paikka = k.Paikka,
                Maa = k.Maa, Utc = k.Utc, Lat = k.Lat, Lon = k.Lon, Kuvateksti = k.Kuvateksti, Lahde = lahde };
        }

        static void TeePikkukuva(string lahde, string kohde)
        {
            var t = new Texture2D(2, 2, TextureFormat.RGBA32, false);
            try
            {
                if (!t.LoadImage(File.ReadAllBytes(lahde))) throw new Exception("purku");
                float s = (float)PikkukuvaPx / Mathf.Max(t.width, t.height);
                int w = Mathf.Max(1, Mathf.RoundToInt(t.width * s)), h = Mathf.Max(1, Mathf.RoundToInt(t.height * s));
                var rt = RenderTexture.GetTemporary(w, h, 0, RenderTextureFormat.ARGB32, RenderTextureReadWrite.sRGB);
                var ennen = RenderTexture.active;
                Graphics.Blit(t, rt);
                RenderTexture.active = rt;
                var p = new Texture2D(w, h, TextureFormat.RGB24, false);
                p.ReadPixels(new Rect(0, 0, w, h), 0, 0); p.Apply(false);
                RenderTexture.active = ennen; RenderTexture.ReleaseTemporary(rt);
                File.WriteAllBytes(kohde, p.EncodeToJPG(85));
                UnityEngine.Object.Destroy(p);
            }
            finally { UnityEngine.Object.Destroy(t); }
        }
    }
}
