// KUVAN TEKIJÄ JA LISENSSI LÄHDERIVILLÄ (Natiivi-UI): webin js/kuvatekija.js taydennaLahde (Pelikoodari 27.9.2026,
// web #3438 v2333, Fablen App Store -laatuerä "TEKIJÄMERKINNÄT").
//
// Paketeissa lähde on vapaata tekstiä ("Diego Delso, Wikimedia Commons (CC BY-SA 4.0)"). Osalta Commons-kuvista teksti
// puuttuu tai siitä puuttuu lisenssi tai tekijä; ne on haettu Commonsin metatiedoista tauluun js/packs/commons-tekijat.js
// (paketissa moduulit/js/packs/commons-tekijat.json, exportit.COMMONS_TEKIJAT: tiedostonimi → [tekijä, lisenssi,
// lisenssiUrl], tyhjä tekijä = tuntematon). Taydenna liittää puuttuvan osan riville samalla säännöllä kuin web.
//
// Kutsupaikka on yksi: LehtiKuva.LahdeRivi (kaikki lähderivit piirtyvät sen kautta, kuten webin taytaLahderivi).
// Kuvan Commons-nimi luetaan LehtiKuva.Lahteesta: pelkkä tiedostonimi (web kuva/tiedosto/lippu) tai siitä rakennettu
// Commons-osoite (Special:FilePath/… tai upload.wikimedia.org/…). Taulu ladataan kerran ensimmäisellä kutsulla;
// ennen latautumista rivi näkyy sellaisenaan (seuraava piirto täydentää).
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class Kuvatekija
    {
        public const string Moduuli = "moduulit/js/packs/commons-tekijat.json";

        static readonly Regex Arkistot = new Regex(@"^(Wikimedia Commons|Commons|Library of Congress|BnF|BnF Gallica|Bundesarchiv|Rijksmuseum|Nationaal Archief|archive\.org|Flickr|NASA|Europeana|Wikipedia)$", RegexOptions.IgnoreCase);
        static readonly Regex Lisenssi = new Regex(@"^(cc[ -]?(by|0)|public domain|pd|no restrictions|ogl|fal|gfdl|free art licen[cs]e|attribution)\b", RegexOptions.IgnoreCase);
        static readonly Regex Oikeuslause = new Regex(@"^(ei\s|no known|kein)", RegexOptions.IgnoreCase);
        /// <summary>Web MUU_LISENSSI: muut kuin CC-lisenssit (OSM, avoin hallinnon lisenssi, Flickr Commons).</summary>
        static readonly Regex MuuLisenssi = new Regex(@"\b(ODbL|OGL|Open Government Licen[cs]e|no known copyright restrictions|no restrictions)\b", RegexOptions.IgnoreCase);
        /// <summary>Web lisenssi.js aaniLisenssiTunnus != null.</summary>
        static readonly Regex CcTunnus = new Regex(@"\b(CC0|CC[- ]BY(?:-(?:NC|ND|SA))*(?:[- ]\d(?:\.\d)?)?|PD|Public Domain)\b", RegexOptions.IgnoreCase);
        static readonly Regex EiKaupallinen = new Regex(@"non-?commercial", RegexOptions.IgnoreCase);
        static readonly Regex Osat = new Regex(@"[(),]|\s+/\s+");
        static readonly Regex LopunNimi = new Regex("[,]\\s*[\"“][^\"”]*[\"”]\\s*$");

        static Dictionary<string, (string Tekija, string Lisenssi)> taulu;
        static bool haussa;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { taulu = null; haussa = false; }

        /// <summary>Web onTekija: jääkö arkistojen, lisenssien ja oikeuslauseiden jälkeen jotain (= tekijä).</summary>
        public static bool OnTekija(string lahde)
        {
            foreach (var osa in Osat.Split(lahde ?? ""))
            {
                var o = osa.Trim();
                if (o.Length > 0 && !Arkistot.IsMatch(o) && !Lisenssi.IsMatch(o) && !Oikeuslause.IsMatch(o)) return true;
            }
            return false;
        }

        /// <summary>Web onLisenssi: CC/PD-tunnus tai muu tunnettu lisenssi.</summary>
        public static bool OnLisenssi(string teksti)
        {
            var t = teksti ?? "";
            return CcTunnus.IsMatch(t) || EiKaupallinen.IsMatch(t) || MuuLisenssi.IsMatch(t);
        }

        /// <summary>Lähderivi täydennettynä Commonsin tekijällä ja lisenssillä (web taydennaLahde); muuten sellaisenaan.</summary>
        public static string Taydenna(string lahde, string kuva)
        {
            var t = Hae();
            if (t == null) return lahde;
            string teksti = (lahde ?? "").Trim();
            string nimi = CommonsNimi(kuva, t);
            if (nimi == null) return lahde;
            var (tekija, lisenssi) = t[nimi];
            // "Wikimedia Commons, "tiedosto.jpg"" → nimi pois: se ei ole tekijä eikä kerro pelaajalle mitään.
            string runko = LopunNimi.Replace(teksti, "");
            bool tekijaOn = OnTekija(runko), lisenssiOn = OnLisenssi(teksti);
            if (tekijaOn && lisenssiOn) return teksti;
            string kuka = tekijaOn ? "" : (string.IsNullOrEmpty(tekija) ? "tekijä tuntematon" : tekija);
            if (runko.Length == 0) return kuka + ", Wikimedia Commons (" + lisenssi + ")";
            string loppu = lisenssiOn ? runko : runko + " (" + lisenssi + ")";
            return kuka.Length > 0 ? kuka + ", " + loppu : loppu;
        }

        /// <summary>Commons-tiedostonimi kuvasta: pelkkä nimi tai Commons-osoitteen nimi, jos se on taulussa.</summary>
        static string CommonsNimi(string kuva, Dictionary<string, (string, string)> t)
        {
            if (string.IsNullOrEmpty(kuva)) return null;
            if (!kuva.Contains("/")) return t.ContainsKey(kuva) ? kuva : null;
            if (!kuva.Contains("wikimedia.org/")) return null;
            string polku = kuva.Split('?', '#')[0];
            var osat = polku.Split('/');
            // Special:FilePath/<nimi>, upload.wikimedia.org/…/<nimi> tai …/thumb/…/<nimi>/640px-<nimi>.
            for (int i = osat.Length - 1; i >= Math.Max(0, osat.Length - 2); i--)
            {
                string n = Uri.UnescapeDataString(osat[i]).Replace('_', ' ');
                if (t.ContainsKey(n)) return n;
            }
            return null;
        }

        /// <summary>Taulu tai null (ensimmäinen kutsu käynnistää latauksen paketista).</summary>
        static Dictionary<string, (string Tekija, string Lisenssi)> Hae()
        {
            if (taulu != null || haussa || !UiKerros.Olemassa) return taulu;
            haussa = true;
            UiKerros.Hae().StartCoroutine(Sisalto.HaePaketista(Moduuli, json =>
            {
                var uusi = new Dictionary<string, (string, string)>();
                try
                {
                    var exportit = MiniJson.ObjektiTaiNull(MiniJson.Kentta(MiniJson.ObjektiTaiNull(MiniJson.Jasenna(json ?? "{}")), "exportit"));
                    var rivit = MiniJson.ObjektiTaiNull(MiniJson.Kentta(exportit, "COMMONS_TEKIJAT"));
                    if (rivit != null)
                        foreach (var r in rivit)
                            if (r.Value is List<object> l && l.Count >= 2)
                                uusi[r.Key] = (l[0] as string ?? "", l[1] as string ?? "");
                }
                catch (Exception ex) { Debug.LogWarning("MATKAKIRJA kuvatekijät: " + ex.Message); }
                taulu = uusi;
                Debug.Log($"MATKAKIRJA kuvatekijät: {uusi.Count} Commons-kuvaa");
            }, true));
            return null;
        }
    }
}
