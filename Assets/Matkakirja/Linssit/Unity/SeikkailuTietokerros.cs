// HISTORIAMOOTTORI: TIETOKERROS UNITYSSA (Siirtoseppä 7.10.2026; ydin Matkakirja.Linssit.Seikkailu.Tietokerros). Lataa
// media.matkakirja.app/seikkailu/<rakennus>/tietokerros-v1/tietokerros.json, päättelee pelaajan huoneen (1 vene, 2 laituri ja portti,
// 3 pikkupiha ja keittiö, 4 Kirkkotorni ja portaat, 5 kappeli) kävelyosista ja korkeudesta, avaa huoneen kortit ja muistaa ne
// (PlayerPrefs). Pelin aikana ei tekstiä: Natiivi-UI:n kutsu SeikkailuTapit.TietokorttiAvautui(lyhyt) (heijastuksella; Pulun ele
// "utelias"); lopussa (nousun jälkeen) SeikkailuTapit.NaytaTietokerros(otsikot, tekstit, lyhyet): Pulu ilahtuu, ja kortisto (KORTTI-pohja)
// aukeaa, kun pelaaja napauttaa Pulua.
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;
using UnityEngine.Networking;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuTietokerros : MonoBehaviour
    {
        public static SeikkailuTietokerros Aktiivinen { get; private set; }
        Tietokerros ydin; string avain; Action<string> kirjaa; float seuraava; int huone;
        public int Huone => huone;
        public Tietokerros Ydin => ydin;

        public static SeikkailuTietokerros Luo(Transform isa, string url, string rakennusId, Action<string> kirjaa)
        {
            if (Aktiivinen != null) return Aktiivinen;
            var go = new GameObject("Seikkailu tietokerros"); go.transform.SetParent(isa, false);
            var t = go.AddComponent<SeikkailuTietokerros>(); t.kirjaa = kirjaa; t.avain = "seikkailu-tietokerros-" + rakennusId;
            Aktiivinen = t; t.StartCoroutine(t.Lataa(url));
            return t;
        }

        IEnumerator Lataa(string url)
        {
            using var q = UnityWebRequest.Get(url + "?v=1"); q.timeout = 20;
            yield return q.SendWebRequest();
            if (q.result != UnityWebRequest.Result.Success) { kirjaa?.Invoke($"seikkailu: tietokerros ei latautunut ({q.error})"); yield break; }
            string tallessa = ""; try { tallessa = PlayerPrefs.GetString(avain, ""); } catch (Exception) { }
            ydin = Tietokerros.Lue(q.downloadHandler.text, tallessa.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries));
            kirjaa?.Invoke($"seikkailu: tietokerros {ydin.Kortit.Count} korttia, avattu {ydin.Avatut.Count}");
        }

        /// <summary>Pelaajan huone kävelyosasta ja korkeudesta (kappeli y ≥ 9 m); 0 = ei tiedossa.</summary>
        static int PaatteleHuone()
        {
            var p = SeikkailuPelaaja.Aktiivinen;
            if (p == null) return SeikkailuVene.Aktiivinen != null ? 1 : 0;
            // M-osa (8.10.): pako (kellosta veneeseen) 10, ote-kiipeily ulkoseinällä 8.
            if (SeikkailuPako.Aktiivinen is SeikkailuPako pk && pk.Ydin.Vaihe != PakoVaihe.Odottaa && pk.Ydin.Vaihe != PakoVaihe.Kello) return 10;
            if (p.OteKiipeily != null) return 8;
            var d = SeikkailuKavely.Data; if (d == null) return 0;
            var pp = p.transform.position;
            if (SeikkailuKomero.Aktiivinen is SeikkailuKomero ko && ko.Lahella(pp)) return 9;
            if (SeikkailuKappeli.Aktiivinen != null && SeikkailuKappeli.Aktiivinen.Nyt != SeikkailuKappeli.Vaihe.Odottaa && pp.y < 12.5f) return 5;
            var pos = p.transform.position; double x = pos.x, y = pos.y, z = -pos.z;
            foreach (var o in d.Osat.Values)
            {
                if (x < o.RajatMin[0] - 0.5 || x > o.RajatMax[0] + 0.5 || z < o.RajatMin[2] - 0.5 || z > o.RajatMax[2] + 0.5 || y < o.RajatMin[1] - 1 || y > o.RajatMax[1] + 1) continue;
                switch (o.Id)
                {
                    case "vesiportti": case "porttikaytava-T102": return 2;
                    case "keittio-G102": case "pikkupiha": return 3;
                    case "kirkkotorni-portaat": return y >= 9.0 ? 5 : 4;
                    case "kappeli-kavely": return y >= 12.5 ? 7 : 5;   // ampumakäytävä kappelin yllä kuuluu huoneeseen 7
                    case "palatsi": return 6;
                    case "muurikaytava": return y >= 16.0 ? 8 : 7;     // harja 16,6; käytävä 13,4 (komero ja pako yllä tilasta)
                    case "tyrma-E101": return 0;                       // tyrmä ei avaa kortteja
                }
            }
            return 0;
        }

        void Update()
        {
            if (ydin == null || Time.unscaledTime < seuraava) return;
            seuraava = Time.unscaledTime + 0.5f;
            int h = PaatteleHuone();
            if (h == 0 || h == huone) return;
            huone = h;
            foreach (var k in ydin.Huone(h)) Avautui(k);
        }

        void Avautui(Tietokortti k)
        {
            Talleta();
            kirjaa?.Invoke($"seikkailu: tietokortti avautui {k.Numero} {k.Lyhyt}");
            Kutsu("TietokorttiAvautui", k.Lyhyt ?? "");   // null yksinään params-taulukkona = null-taulukko
        }

        /// <summary>Lopputekstit (loppukortit) näytetty; pysyy, kunnes tietokerros poistuu linnan mukana (loppumusiikin silmukka).</summary>
        public bool LoppuAuki { get; private set; }

        /// <summary>Pystyleikkeen loppu: loppukortit auki ja kortisto Natiivi-UI:lle.</summary>
        public void Loppu()
        {
            if (ydin == null) return;
            LoppuAuki = true;
            foreach (var k in ydin.Loppu()) kirjaa?.Invoke($"seikkailu: tietokortti avautui {k.Numero} {k.Lyhyt} (loppu)");
            Talleta();
            var o = new List<string>(); var t = new List<string>(); var l = new List<string>();
            foreach (var k in ydin.Kortit) { o.Add(k.Otsikko); t.Add(k.Teksti); l.Add(k.Lyhyt); }
            Kutsu("NaytaTietokerros", o.ToArray(), t.ToArray(), l.ToArray());
        }

        void Talleta() { try { PlayerPrefs.SetString(avain, string.Join(",", ydin.Avatut)); PlayerPrefs.Save(); } catch (Exception) { } }

        void Kutsu(string metodi, params object[] arg)
        {
            var tp = typeof(SeikkailuTietokerros).Assembly.GetType("Matkakirja.Natiivi.SeikkailuTapit");
            var m = tp?.GetMethod(metodi, System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static);
            if (m == null) return;
            try { m.Invoke(null, arg); } catch (Exception e) { kirjaa?.Invoke($"seikkailu: tietokerros {metodi}: {e.InnerException?.Message ?? e.Message}"); }
        }

        void OnDestroy() { if (Aktiivinen == this) Aktiivinen = null; }
    }
}
