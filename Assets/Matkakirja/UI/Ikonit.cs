// Verkkopelin viivaikonit (24 × 24 viewBox) sanatarkasti: js/ui-apurit.js VIIVA_IKONIT,
// index.html (ratas, valikko, päivitys), js/main.js (äänikytkimet, pieni liike), js/ui.js (laukku).
// Piirto: SvgIkoni (path, rect, circle, ellipse, line, polyline, polygon; class="taytto" = täyttö).
using System.Collections.Generic;
namespace Matkakirja.Natiivi
{
    public static class Ikonit
    {
        // index.html #kehittaja-valikko-btn (~rivi 173): hammasratas.
        public const string Ratas = "<path d=\"M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6z\"/><path d=\"M19.3 14.1a1.4 1.4 0 0 0 .3 1.6l.1.1a1.7 1.7 0 1 1-2.4 2.4l-.1-.1a1.4 1.4 0 0 0-1.6-.3 1.4 1.4 0 0 0-.9 1.3v.2a1.7 1.7 0 0 1-3.4 0v-.1a1.4 1.4 0 0 0-.9-1.3 1.4 1.4 0 0 0-1.6.3l-.1.1a1.7 1.7 0 1 1-2.4-2.4l.1-.1a1.4 1.4 0 0 0 .3-1.6 1.4 1.4 0 0 0-1.3-.9h-.2a1.7 1.7 0 0 1 0-3.4h.1a1.4 1.4 0 0 0 1.3-.9 1.4 1.4 0 0 0-.3-1.6l-.1-.1a1.7 1.7 0 1 1 2.4-2.4l.1.1a1.4 1.4 0 0 0 1.6.3h.1a1.4 1.4 0 0 0 .9-1.3v-.2a1.7 1.7 0 0 1 3.4 0v.1a1.4 1.4 0 0 0 .9 1.3 1.4 1.4 0 0 0 1.6-.3l.1-.1a1.7 1.7 0 1 1 2.4 2.4l-.1.1a1.4 1.4 0 0 0-.3 1.6v.1a1.4 1.4 0 0 0 1.3.9h.2a1.7 1.7 0 0 1 0 3.4h-.1a1.4 1.4 0 0 0-1.3.9z\"/>";

        // index.html #menu-btn (~rivi 355): hampurilaisvalikko, kolme suoraa viivaa.
        public const string Valikko = "<path d=\"M4.5 7h15M4.5 12h15M4.5 17h15\"/>";

        // index.html #versio-paivitys (~rivi 499): päivitysnuoli. Sama piirros kuin
        // VIIVA_IKONIT.paivita alla (Viiva["paivita"]) mutta eri käyttöpaikka index.html:ssä,
        // joten molemmat pidetään ja tämä nimetään erikseen ohjeen mukaan.
        public const string PaivitaVersio = "<path d=\"M19.4 4.8v3.7h-3.7\"/><path d=\"M19.2 8.4a7.4 7.4 0 1 0 1 5.4\"/>";

        // js/main.js AANIKYTKIMET (~rivi 561-583): Kertoja.
        public const string Kertoja = "<path d=\"M4.5 11c2.3-1.1 4.6-1.1 7.5 0 2.9-1.1 5.2-1.1 7.5 0v8.2c-2.3-1.1-4.6-1.1-7.5 0-2.9-1.1-5.2-1.1-7.5 0z\"/><path d=\"M12 11v8.2\"/><path d=\"M10.2 6.8a2.9 2.9 0 0 1 3.6 0\"/><path d=\"M8.6 4.2a5.6 5.6 0 0 1 6.8 0\"/>";

        // js/main.js AANIKYTKIMET: Musiikki.
        public const string Musiikki = "<path d=\"M9 18V6l10-2v12\"/><ellipse cx=\"6.5\" cy=\"18\" rx=\"2.5\" ry=\"2\"/><ellipse cx=\"16.5\" cy=\"16\" rx=\"2.5\" ry=\"2\"/>";

        // js/main.js AANIKYTKIMET: avain 'tausta', nimi "Äänimaisema".
        public const string Aanimaisema = "<path d=\"M4.5 9.4h2.8l4.2-3.4v12l-4.2-3.4H4.5z\"/><path d=\"M15.4 8.6a4.4 4.4 0 0 1 0 6.8\"/><path d=\"M18.2 6.2a7.6 7.6 0 0 1 0 11.6\"/>";

        // js/main.js kartta-valikko (~rivi 693): "Pieni liike" -kytkin.
        public const string PieniLiike = "<path d=\"M4 15.5c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0\"/><path d=\"M4 10.5c2.5-2.5 5-2.5 7.5 0s5 2.5 7.5 0\"/>";
        /// <summary>Kuljettu reitti: mutkitteleva viiva lähtö- ja tulopisteineen (☰ Kartta).</summary>
        public const string KuljettuReitti = "<path d=\"M5.5 17.5c3.5 0 3-6 6.5-6s3-5 6.5-5\"/><circle cx=\"4\" cy=\"18\" r=\"1.7\"/><circle cx=\"20\" cy=\"6\" r=\"1.7\"/>";

        // js/ui.js renderTurnPill (~rivi 10942-10946): matkalaukun kahva.
        public const string Laukku = "<rect x=\"4\" y=\"8\" width=\"16\" height=\"11.5\" rx=\"4\"/><path d=\"M9.3 8V6.3a1.7 1.7 0 0 1 1.7-1.7h2a1.7 1.7 0 0 1 1.7 1.7V8\"/><path d=\"M6.6 9.6h10.8\"/><circle cx=\"12\" cy=\"9.6\" r=\"0.85\"/><path d=\"M7 13.6 10.3 16.4 13.7 13.6 17 16.4\"/>";

        // Merkit, joita iOS:n American Typewriter / Iowan Old Style eivät sisällä (◈ ▸ ⌄ ⏸ ▶):
        // tekstinä ne näkyisivät laatikkoina, joten ne piirretään viivaikoneina.
        public const string Aarremerkki = "<path d=\"M12 3 21 12 12 21 3 12z\"/><path d=\"M12 8.2 15.8 12 12 15.8 8.2 12z\" fill=\"currentColor\"/>";
        // js/lehti.js avaaSisallysvalikko: "Palaa kartalle" -napin nuoli.
        // js/ui.js .flight-eteen (Ohita lento -nuoli, aloituslennon Ohita-nappi, löydös 83).
        public const string OhitaLento = "<path d=\"M8 5 L15 12 L8 19\"/>";
        public const string Paluu = "<path d=\"M13.5 5.5 7 12l6.5 6.5\"/><path d=\"M7 12h10.5\"/>";

        // js/maalehti.js naytaMaaTunnusluvut IKONIT (15 × 15 viewBox: SvgIkoni.Ruutu = 15).
        public const string TunnusVaki = "<circle cx=\"7.3\" cy=\"4.1\" r=\"2.7\"/><path d=\"M2 13.4c.7-3.4 2.7-5.1 5.3-5.1s4.6 1.7 5.3 5.1\"/>";
        public const string TunnusAla = "<rect x=\"1\" y=\"1\" width=\"12.6\" height=\"12.6\" rx=\"1.8\"/><path d=\"M1 9.4l3.4-3 2.6 2.2 3.2-3.6 3.4 2.6\"/>";
        public const string TunnusVaaka = "<path d=\"M7.3 1.8v11.4M3.6 13.2h7.4M2.4 4.2h9.8\"/><path d=\"M2.4 4.2 1 7.9a2.2 2.2 0 0 0 2.8 0zM12.2 4.2l-1.4 3.7a2.2 2.2 0 0 0 2.8 0z\"/>";
        public const string TunnusRaha = "<circle cx=\"7.3\" cy=\"7.5\" r=\"5.9\"/><path d=\"M7.3 4.3v6.4M5.5 6.2c0-.9.8-1.6 1.8-1.6s1.8.65 1.8 1.5c0 1.9-3.6 1.05-3.6 2.95 0 .85.8 1.5 1.8 1.5s1.8-.7 1.8-1.6\"/>";

        public const string NuoliOikea = "<path d=\"M9 5.5 15.5 12 9 18.5\"/>";
        public const string NuoliAlas = "<path d=\"M5.5 9 12 15.5 18.5 9\"/>";
        public const string Tauko = "<path d=\"M8.5 5v14M15.5 5v14\"/>";
        public const string Nuoli = "<path d=\"M5 12h14M13 6l6 6-6 6\"/>";
        public const string NuoliYlos = "<path d=\"M12 19V5M6 11l6-6 6 6\"/>";
        public const string Kyna = "<path d=\"M4 20h4L19 9l-4-4L4 16z\"/><path d=\"M13.5 6.5l4 4\"/>";
        public const string Edellinen = "<path d=\"M16.5 4.8 5 12l11.5 7.2z\" fill=\"currentColor\"/>";
        public const string Toista = "<path d=\"M7.5 4.8 19 12 7.5 19.2z\" fill=\"currentColor\"/>";

        // js/karttatyokalu-maakunnat.js PLUS_IKONI ja PULU_IKONI (maakunnan luonnehdinta ja kortti).
        public const string Plus = "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 8v8M8 12h8\"/>";
        public const string Puhekupla = "<path d=\"M4 5h16v10H9l-4 4v-4H4z\"/><circle cx=\"9.5\" cy=\"10\" r=\"0.9\"/><circle cx=\"14.5\" cy=\"10\" r=\"0.9\"/>";

        /// <summary>VIIVA_IKONIT avaimittain (sama avain kuin webissä, js/ui-apurit.js).</summary>
        public static readonly Dictionary<string, string> Viiva = new Dictionary<string, string>
        {
            ["saapas"] = "<path d=\"M7 3.5h4.4v8.2c0 .9.6 1.7 1.5 2l4.8 1.6c1.4.5 2.3 1.3 2.3 2.4 0 .8-.6 1.4-1.4 1.4H8.6c-.9 0-1.6-.7-1.6-1.6z\"/><path d=\"M7 6h4.4M7 8.2h4.4M4 20.6h16.5\"/>",
            ["purje"] = "<path d=\"M11 5.4 6 13.6h5zM13 4.2l5.6 9.4H13z\"/><path d=\"M4.6 16.2h14.8l-2 3.4H6.6zM12 13.6v2.6\"/>",
            ["suurennuslasi"] = "<circle cx=\"9.8\" cy=\"9.8\" r=\"5.6\"/><path d=\"M13.9 13.9 20 20\"/>",
            ["taikalasit"] = "<circle cx=\"6.9\" cy=\"13.6\" r=\"3.5\"/><circle cx=\"17.1\" cy=\"13.6\" r=\"3.5\"/><path d=\"M10.4 13.2c1-.8 2.2-.8 3.2 0\"/><path d=\"M3.5 12.2 2.1 9.2M20.5 12.2 21.9 9.2\"/>",
            ["varusteet"] = "<path d=\"M9.2 8.4V6.9a2.8 2.8 0 0 1 5.6 0v1.5\"/><rect x=\"4.6\" y=\"8.4\" width=\"14.8\" height=\"12\" rx=\"3.4\"/><path d=\"M4.7 14.6h14.6\"/><rect x=\"10.4\" y=\"13.1\" width=\"3.2\" height=\"3.8\" rx=\"1.1\"/>",
            ["pollo"] = "<path d=\"M6.4 5.2 8.4 7.6\"/><path d=\"M17.6 5.2 15.6 7.6\"/><path d=\"M12 3.7c3.3 0 5.7 2.6 5.7 6.3 0 5.1-2.3 8.5-5.7 8.5s-5.7-3.4-5.7-8.5c0-3.7 2.4-6.3 5.7-6.3z\"/><circle cx=\"9.6\" cy=\"9.5\" r=\"1.9\"/><circle cx=\"14.4\" cy=\"9.5\" r=\"1.9\"/><circle class=\"taytto\" cx=\"9.6\" cy=\"9.5\" r=\"0.75\"/><circle class=\"taytto\" cx=\"14.4\" cy=\"9.5\" r=\"0.75\"/><path d=\"M12 11.3 11 13.1h2z\"/><path d=\"M8.7 14.7c1 .9 1.9 1.3 3.3 1.3s2.3-.4 3.3-1.3\"/><path d=\"M9.4 18.4v1.6M14.6 18.4v1.6\"/><path d=\"M4.4 20.2h15.2\"/>",
            ["noppa"] = "<rect x=\"3.6\" y=\"3.6\" width=\"16.8\" height=\"16.8\" rx=\"3.2\"/><g class=\"taytto\"><circle cx=\"8.2\" cy=\"8.2\" r=\"1.25\"/><circle cx=\"15.8\" cy=\"8.2\" r=\"1.25\"/><circle cx=\"12\" cy=\"12\" r=\"1.25\"/><circle cx=\"8.2\" cy=\"15.8\" r=\"1.25\"/><circle cx=\"15.8\" cy=\"15.8\" r=\"1.25\"/></g>",
            ["kompassi"] = "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><path d=\"M12 5.8 14.3 12 12 18.2 9.7 12z\"/><circle class=\"taytto\" cx=\"12\" cy=\"12\" r=\"1\"/>",
            ["peukalo"] = "<path d=\"M8.4 20.4V11.2l3.4-3.6V4.9a1.5 1.5 0 0 1 3 0v4.4h3.1a1.9 1.9 0 0 1 1.9 2.2l-.9 6.1a2.4 2.4 0 0 1-2.4 2z\"/><rect x=\"3.6\" y=\"11.2\" width=\"4.8\" height=\"9.2\" rx=\"1.2\"/>",
            ["bussi"] = "<rect x=\"3.4\" y=\"4.6\" width=\"17.2\" height=\"11.6\" rx=\"2.4\"/><path d=\"M3.6 12.2h16.8\"/><path d=\"M9.2 7.2v5M14.8 7.2v5\"/><g class=\"taytto\"><circle cx=\"7.6\" cy=\"18.6\" r=\"1.7\"/><circle cx=\"16.4\" cy=\"18.6\" r=\"1.7\"/></g>",
            ["silma"] = "<path d=\"M2.8 12c2.4-4 5.5-6 9.2-6s6.8 2 9.2 6c-2.4 4-5.5 6-9.2 6s-6.8-2-9.2-6z\"/><circle cx=\"12\" cy=\"12\" r=\"3.1\"/><circle class=\"taytto\" cx=\"12\" cy=\"12\" r=\"1.1\"/>",
            ["kirja"] = "<path d=\"M12 6.6c-2-1.5-4.6-2-7.6-1.6v12.6c3-.4 5.6.1 7.6 1.6 2-1.5 4.6-2 7.6-1.6V5c-3-.4-5.6.1-7.6 1.6z\"/><path d=\"M12 6.6v12.6\"/>",
            ["nuoli"] = "<path d=\"M9.5 6.2 5 10.6l4.5 4.4\"/><path d=\"M5 10.6h9.2a4.6 4.6 0 1 1 0 9.2H9.5\"/>",
            ["kone"] = "<path d=\"M12 3.6v5.9l7.6 4.6v2.1L12 13.7v4.4l2.4 1.9v1.6L12 20.5l-2.4 1.1V20l2.4-1.9v-4.4L4.4 16.2v-2.1L12 9.5z\"/>",
            ["tahti"] = "<path d=\"m12 3.8 2.5 5.2 5.5.7-4 3.9 1 5.6-5-2.7-5 2.7 1-5.6-4-3.9 5.5-.7z\"/>",
            ["passi"] = "<rect x=\"5.5\" y=\"3.5\" width=\"13\" height=\"17\" rx=\"2\"/><circle cx=\"12\" cy=\"10.3\" r=\"2.9\"/><path d=\"M8.6 16.6h6.8\"/>",
            ["paivita"] = "<path d=\"M19.4 4.8v3.7h-3.7\"/><path d=\"M19.2 8.4a7.4 7.4 0 1 0 1 5.4\"/>",
            // Sulkuristi ✕ (U+2715, web fokusnosto/fokuskohteet/kaupunkinosto/karttaselite): viiva, koska kirjasimissa ei ole merkkiä.
            ["rasti"] = "<path d=\"M6.5 6.5L17.5 17.5M17.5 6.5L6.5 17.5\"/>",
            ["kallo"] = "<path d=\"M12 3.8c-3.9 0-6.5 2.7-6.5 6.1 0 2 .9 3.3 2.1 4.2v2.5h8.8v-2.5c1.2-.9 2.1-2.2 2.1-4.2 0-3.4-2.6-6.1-6.5-6.1z\"/><g class=\"taytto\"><circle cx=\"9.6\" cy=\"10.1\" r=\"1.3\"/><circle cx=\"14.4\" cy=\"10.1\" r=\"1.3\"/></g><path d=\"M10.3 16.6v2.4M13.7 16.6v2.4\"/>",
            ["kukkaro"] = "<path d=\"M9.6 6.9 8.3 4.2h7.4L14.4 6.9\"/><path d=\"M9.6 6.9h4.8c2.5 1.6 4.1 4.2 4.1 7 0 3.3-2.5 5.4-6.5 5.4s-6.5-2.1-6.5-5.4c0-2.8 1.6-5.4 4.1-7z\"/>",
            ["estetty"] = "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><path d=\"M6.3 6.3l11.4 11.4\"/>",
            ["ankkuri"] = "<circle cx=\"12\" cy=\"5\" r=\"1.8\"/><path d=\"M12 6.8v12.6M8.7 9.6h6.6\"/><path d=\"M5.2 13.8c.3 3.9 3.2 6.3 6.8 6.3s6.5-2.4 6.8-6.3\"/><path d=\"M5.2 13.8 3.5 12.6M18.8 13.8l1.7-1.2\"/>",
            ["mitali"] = "<path d=\"M9.6 3.6 8.2 9.2M14.4 3.6l1.4 5.6\"/><circle cx=\"12\" cy=\"14.4\" r=\"5.2\"/><circle class=\"taytto\" cx=\"12\" cy=\"14.4\" r=\"1.1\"/>",
            ["kaiutin"] = "<path d=\"M4.2 9.3h3.2l4.4-3.6v12.6l-4.4-3.6H4.2z\"/><path d=\"M14.8 9.4a3.7 3.7 0 0 1 0 5.2\"/><path d=\"M17.4 6.9a7.3 7.3 0 0 1 0 10.2\"/>",
            ["taitekartta"] = "<path d=\"M3.6 6.6 9 4.4v13l-5.4 2.2z\"/><path d=\"M9 4.4 15 6.6v13L9 17.4z\"/><path d=\"M15 6.6l5.4-2.2v13L15 19.6z\"/>",
            ["satelliitti"] = "<rect x=\"2.8\" y=\"9.7\" width=\"5.4\" height=\"4.6\" rx=\"0.7\"/><rect x=\"15.8\" y=\"9.7\" width=\"5.4\" height=\"4.6\" rx=\"0.7\"/><rect x=\"9.9\" y=\"9.3\" width=\"4.2\" height=\"5.4\" rx=\"1\"/><path d=\"M8.2 12h1.7M14.1 12h1.7\"/><path d=\"M12 9.3V6.4\"/><path d=\"M9.7 5.5a3.4 3.4 0 0 1 4.6 0\"/>",
            ["varikartta"] = "<path d=\"M12 3.6c4.7 0 8.4 3.1 8.4 7 0 2.5-1.9 3.5-3.7 3.5h-1.9c-1 0-1.7.8-1.4 1.7.3.8.9 1.3.9 2.3 0 1.4-1.1 2.3-2.5 2.3-4.6 0-8.2-3.8-8.2-8.4 0-4.6 3.8-8.4 8.4-8.4z\"/><circle class=\"taytto\" cx=\"8.2\" cy=\"9.4\" r=\"1\"/><circle class=\"taytto\" cx=\"12\" cy=\"7.6\" r=\"1\"/><circle class=\"taytto\" cx=\"15.8\" cy=\"9.4\" r=\"1\"/>",
        };
    }
}
