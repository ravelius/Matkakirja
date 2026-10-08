// HISTORIAMOOTTORI V6: TALLENTAJA UNITYSSA (Siirtoseppä 7.10.2026; pelattavuusmalli kohta 4.3; ydin SeikkailuTallennus). Tallentaa
// tapahtumista persistentDataPath/seikkailu-olavinlinna.json: tarkistuspiste portaalista (SeikkailuVartijat.Tarkistuspiste), avainesine
// (SeikkailuEsineet.Nostettiin), kalkki alttarille, kiinnijäänti (huoneittain), löytö. Jatkaminen tallennuksesta vain pyynnöstä
// (DioraamaSovitin.PelattavaPalaJatka, Natiivi-UI:n "Jatka"); oletus on aina alusta, jottei testaaja jää kesken palan. Valmis pala
// poistaa tallennuksen.
using System;
using System.IO;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuTallentaja : MonoBehaviour
    {
        public static SeikkailuTallentaja Aktiivinen { get; private set; }
        SeikkailuTallennus t; string polku; Action<string> kirjaa; float alku;
        public SeikkailuTallennus Tila => t;

        static string Polku(string rakennus) => Path.Combine(Application.persistentDataPath, "seikkailu-" + rakennus + ".json");

        /// <summary>Tallennus levyltä tai null (ei tiedostoa, rikki tai eri datan versio).</summary>
        public static SeikkailuTallennus LueTiedosto(string rakennus, string dataVersio)
        {
            try
            {
                var p = Polku(rakennus); if (!File.Exists(p)) return null;
                var t = SeikkailuTallennus.Lue(File.ReadAllText(p));
                return t != null && t.DataVersio == dataVersio ? t : null;
            }
            catch (Exception) { return null; }
        }

        public static SeikkailuTallentaja Luo(Transform isa, string rakennus, string dataVersio, SeikkailuTallennus jatka, Action<string> kirjaa)
        {
            Poista();
            var go = new GameObject("Seikkailu tallentaja"); go.transform.SetParent(isa, false);
            var s = go.AddComponent<SeikkailuTallentaja>();
            s.kirjaa = kirjaa; s.polku = Polku(rakennus);
            s.t = jatka ?? new SeikkailuTallennus { Rakennus = rakennus, DataVersio = dataVersio };
            s.alku = Time.unscaledTime - (float)s.t.KulunutS;
            SeikkailuVartijat.Tarkistuspiste += s.Tarkistus; SeikkailuVartijat.Kiinnijaatiin += s.Kiinni;
            SeikkailuEsineet.Nostettiin += s.Nosto; SeikkailuEsineet.AsetettiinAlttarille += s.Alttari;
            Aktiivinen = s;
            return s;
        }

        void Tarkistus(string osa, Vector3 p) { t.OnTarkistus = true; t.X = p.x; t.Y = p.y; t.Z = p.z; t.TarkistusOsa = osa; Tallenna("tarkistuspiste " + osa); }
        void Kiinni(string osa) { string h = osa ?? "?"; t.Kiinnijaamiset[h] = (t.Kiinnijaamiset.TryGetValue(h, out var n) ? n : 0) + 1; Tallenna("kiinnijäänti " + h); }
        void Nosto(string id) { t.Arvoitus["loyto"] = 1; Tallenna("nosto " + id); }
        void Alttari(string id) { if (id == "liuskekivi") { if (!t.Laukku.Contains(id)) t.Laukku.Add(id); } else t.Arvoitus["alttari-" + id] = 1; Tallenna("alttari " + id); }

        /// <summary>Kirjoittaa tallennuksen (kesken kirjoituksen katkeava ei riko vanhaa: väliaikaistiedosto ja siirto).</summary>
        public void Tallenna(string syy)
        {
            try
            {
                var ka = SeikkailuEsineet.Aktiivinen; t.Kadessa = ka != null ? ka.Kadessa : null;
                t.KulunutS = Time.unscaledTime - alku;
                var tmp = polku + ".tmp";
                File.WriteAllText(tmp, t.Kirjoita());
                if (File.Exists(polku)) File.Delete(polku);
                File.Move(tmp, polku);
                kirjaa?.Invoke($"seikkailu: tallennettu ({syy})");
            }
            catch (Exception e) { kirjaa?.Invoke("seikkailu: tallennus epäonnistui: " + e.Message); }
        }

        /// <summary>Pala valmis: tallennus pois (seuraava kerta alusta).</summary>
        public void Valmis() { try { if (File.Exists(polku)) File.Delete(polku); } catch (Exception) { } kirjaa?.Invoke("seikkailu: tallennus poistettu (pala valmis)"); }

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }

        void OnDestroy()
        {
            if (Aktiivinen == this) Aktiivinen = null;
            SeikkailuVartijat.Tarkistuspiste -= Tarkistus; SeikkailuVartijat.Kiinnijaatiin -= Kiinni;
            SeikkailuEsineet.Nostettiin -= Nosto; SeikkailuEsineet.AsetettiinAlttarille -= Alttari;
        }
    }
}
