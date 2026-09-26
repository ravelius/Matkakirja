// MAAKUNTIEN TIEDOT ELÄVÄLLE KARTALLE (Natiivi-UI, 26.9.2026; docs/raportit/elava-kartta-suunnitelma-20260926.md kohta 3,
// käsikirjoitus 8,0–11,5 s "Maakunta herää"). Kartussin maakuntarivi ja kartan käsialanimi tarvitsevat avaimella
// "ISO:tunnus" (sama kuin Maakunnat.cs ja KarttaMuste) kolme asiaa:
//   Nimi        MAAKUNTIEN_NIMET (moduulit/js/karttatyokalu-maakunnat.json; puuttuessa tunnus)
//   Pikkukuva   luonnehdinnan pikkukuva (löydös 158, ämpäriosoite), varana kuva[0].pikku / .osoite (löydös 115, sama sääntö kuin Maakunnat.PaivitaLuonnehdinta);
//               puuttuessa null = ei kuvaa
//   Paikka      maakunnan keskipiste nimen paikaksi: Natiivisepän Maakuntajako-alueen KeskusLat/KeskusLon, kun
//               rajapinta kytketään (Keskipiste); siihen asti vara NostoSisalto.MaakunnanPiste (karttavalojen mediaani)
// Data luetaan kerran (LinssiSisalto, sama välimuisti kuin Maakunnat-välilehdellä) ja jäsennetään taustasäikeessä.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class MaakuntaTiedot
    {
        /// <summary>
        /// RAJAPINTAPYYNTÖ (Natiiviseppä): maakunnan keskipiste Maakuntajako-alueesta (MaatAineisto.Maa.KeskusLat/KeskusLon,
        /// painopiste kuten maiden nimillä). Kytkentä esim. MaakunnatSilta.Kytke: MaakuntaTiedot.Keskipiste = avain =>
        /// mk.MaakunnanKeskus(avain, out var lat, out var lon) ? (lat, lon) : null. null = vara (nostojen mediaani).
        /// </summary>
        public static Func<string, (double Lat, double Lon)?> Keskipiste;

        static Dictionary<string, object> nimet, luonnehdinnat;
        static bool ladattu, haussa;
        static readonly List<Action> odottajat = new List<Action>();
        static readonly Dictionary<string, (double Lat, double Lon)?> paikat = new Dictionary<string, (double, double)?>();

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;
        static bool vanhentunut;

        /// <summary>
        /// Löydös 170: sisältöpaketti vaihtui kesken istunnon (PakettiPaivitys.SisaltoVaihtui) → nimet, luonnehdinnat ja paikat
        /// hylätään; seuraava Lataa hakee uuden version. Kesken oleva haku merkitään vanhentuneeksi.
        /// </summary>
        public static void Hylkaa()
        {
            paikat.Clear();
            if (haussa) { vanhentunut = true; return; }
            ladattu = false;
            nimet = luonnehdinnat = null;
        }

        /// <summary>Lataa nimet ja luonnehdinnat kerran; valmis kutsutaan pääsäikeessä (myös epäonnistuessa).</summary>
        public static void Lataa(Action valmis)
        {
            if (ladattu) { valmis?.Invoke(); return; }
            if (valmis != null) odottajat.Add(valmis);
            if (haussa || !UiKerros.Olemassa) return;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Hae());
        }

        static IEnumerator Hae()
        {
            string n = null, l = null;
            yield return LinssiSisalto.Hae("moduulit/js/karttatyokalu-maakunnat.json", t => n = t);
            yield return LinssiSisalto.Hae("moduulit/js/packs/maakunnat-luonnehdinnat.json", t => l = t);
            var tyo = Task.Run(() => (Viennit(n, "MAAKUNTIEN_NIMET"), Viennit(l, "MAAKUNTIEN_LUONNEHDINNAT")));
            while (!tyo.IsCompleted) yield return null;
            if (tyo.IsFaulted) Debug.LogWarning("MATKAKIRJA ui muste: maakuntadata ei jäsenny: " + tyo.Exception?.GetBaseException().Message);
            else (nimet, luonnehdinnat) = tyo.Result;
            haussa = false;
            ladattu = !vanhentunut;
            vanhentunut = false;
            var kutsut = odottajat.ToArray();
            odottajat.Clear();
            foreach (var k in kutsut)
                try { k(); } catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>Vientitiedoston arvo (kuten Maakunnat.Viennit: { arvo: … } -kääre puretaan).</summary>
        static Dictionary<string, object> Viennit(string json, string nimi)
        {
            if (json == null) return null;
            var x = MiniJson.Kentta(Ob(MiniJson.Kentta(Ob(MiniJson.Jasenna(json)), "exportit")), nimi);
            if (Ob(x) is Dictionary<string, object> o && o.Count == 1 && o.ContainsKey("arvo")) x = o["arvo"];
            return Ob(x);
        }

        static (string Iso, string Tunnus) Jaa(string avain)
        {
            int i = avain?.IndexOf(':') ?? -1;
            return i < 0 ? (null, avain) : (avain.Substring(0, i), avain.Substring(i + 1));
        }

        /// <summary>Maakunnan nimi (ennen latausta ja puuttuessa tunnus).</summary>
        public static string Nimi(string avain)
        {
            var (iso, tunnus) = Jaa(avain);
            return MiniJson.Kentta(Ob(MiniJson.Kentta(nimet, iso ?? "")), tunnus ?? "") as string ?? tunnus ?? "";
        }

        /// <summary>Löydös 158: luonnehdinnan pikkukuva; varana ensimmäisen kuvan pikku tai osoite (115); null = ei kuvaa.</summary>
        public static string Pikkukuva(string avain)
        {
            var (iso, tunnus) = Jaa(avain);
            var o = Ob(MiniJson.Kentta(Ob(MiniJson.Kentta(luonnehdinnat, iso ?? "")), tunnus ?? ""));
            string oma = MiniJson.Teksti(o, "pikkukuva");
            if (!string.IsNullOrEmpty(oma)) return oma;
            var k = MiniJson.Kentta(o, "kuva");
            var eka = Ob(k) ?? (k is List<object> lista && lista.Count > 0 ? Ob(lista[0]) : null);
            if (eka == null) return null;
            string s = MiniJson.Teksti(eka, "pikku") ?? MiniJson.Teksti(eka, "osoite");
            return string.IsNullOrEmpty(s) ? null : s;
        }

        /// <summary>Nimen paikka (lat, lon); ei paikkaa → valmis(false). Tulos muistetaan istunnon ajan.</summary>
        public static IEnumerator Paikka(string avain, Action<double, double, bool> valmis)
        {
            var k = Keskipiste?.Invoke(avain);
            if (k.HasValue) { valmis(k.Value.Lat, k.Value.Lon, true); yield break; }
            if (!paikat.TryGetValue(avain, out var p))
            {
                (double, double)? tulos = null;
                yield return NostoSisalto.MaakunnanPiste(avain, (lat, lon, ok) => { if (ok) tulos = (lat, lon); });
                paikat[avain] = p = tulos;
            }
            if (p.HasValue) valmis(p.Value.Lat, p.Value.Lon, true);
            else valmis(0, 0, false);
        }
    }
}
