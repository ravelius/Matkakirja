// MatkakirjaKauppa.swift — ISS-kameran kuvan osto StoreKit 2:lla (Linssiseppä 2, 4.10.2026; omistajan hintapäätös loki #3939:
// "kuvat ovat 50 senttiä kappale"; Päätoimittajan hyväksymä ostovirta). Kulutettava tuote, hinta Applen displayPrice-arvona.
//
//   MatkakirjaKauppa_Lataa(tunnus, valmis(ok, hinta))         tuote ja hinta (pelaajan valuutassa, esim. "0,50 €")
//   MatkakirjaKauppa_Osta(pyynto, tunnus, valmis(pyynto, tulos, tapahtuma))
//        tulos 1 = onnistui (vahvistettu; tapahtuma = id, päätetään vasta MatkakirjaKauppa_Paata-kutsulla hyvityksen jälkeen),
//              0 = pelaaja perui, 2 = odottaa (Ask to Buy / SCA; hyvitys tulee kuuntelijasta), -1 = epäonnistui tai vahvistamaton
//   MatkakirjaKauppa_Kuuntele(uusi(tunnus, tapahtuma))         Transaction.updates + päättämättömät (keskeytynyt osto, odottava
//                                                              hyväksytty): jokainen vahvistettu, päättämätön tapahtuma kerran
//   MatkakirjaKauppa_Paata(tapahtuma)                          transaction.finish() hyvityksen tallennuksen jälkeen
//
// Kutsut C#:iin pääsäikeessä (DispatchQueue.main). Unity-puoli: Linssit/Unity/IssKuvaKauppa.cs.
import Foundation
import StoreKit

public typealias MatkakirjaKauppaLadattu = @convention(c) (Int32, UnsafePointer<CChar>?) -> Void
public typealias MatkakirjaKauppaOstettu = @convention(c) (Int32, Int32, UnsafePointer<CChar>?) -> Void
public typealias MatkakirjaKauppaUusi = @convention(c) (UnsafePointer<CChar>?, UnsafePointer<CChar>?) -> Void

@available(iOS 15.0, *)
final class MKKauppa {
    static let jaettu = MKKauppa()
    var tuotteet: [String: Product] = [:]
    var avoimet: [String: Transaction] = [:]   // vahvistettu, päättämätön (odottaa C#:n hyvitystä)
    var kuuntelija: Task<Void, Never>?

    func kutsuPaasaikeessa(_ f: @escaping () -> Void) { DispatchQueue.main.async(execute: f) }

    func tuote(_ tunnus: String) async -> Product? {
        if let p = tuotteet[tunnus] { return p }
        do {
            let p = try await Product.products(for: [tunnus]).first
            if let p = p { tuotteet[tunnus] = p }
            return p
        } catch {
            NSLog("MATKAKIRJA kauppa: tuotteen haku %@: %@", tunnus, String(describing: error))
            return nil
        }
    }

    /// Vahvistettu tapahtuma → avoimiin ja C#:lle; vahvistamaton päätetään heti (ei hyvitystä).
    func kasittele(_ tulos: VerificationResult<Transaction>, uusi: MatkakirjaKauppaUusi?) async {
        switch tulos {
        case .verified(let t):
            if t.revocationDate != nil { await t.finish(); return }
            let id = String(t.id)
            if avoimet[id] != nil { return }
            avoimet[id] = t
            let tunnus = t.productID
            kutsuPaasaikeessa { tunnus.withCString { a in id.withCString { b in uusi?(a, b) } } }
        case .unverified(let t, let virhe):
            NSLog("MATKAKIRJA kauppa: vahvistamaton tapahtuma %llu: %@", t.id, String(describing: virhe))
            await t.finish()
        }
    }
}

@_cdecl("MatkakirjaKauppa_Lataa")
public func MatkakirjaKauppa_Lataa(_ tunnus: UnsafePointer<CChar>?, _ valmis: MatkakirjaKauppaLadattu?) {
    let t = tunnus.map { String(cString: $0) } ?? ""
    guard #available(iOS 15.0, *) else { valmis?(0, nil); return }
    Task {
        let p = await MKKauppa.jaettu.tuote(t)
        let hinta = p?.displayPrice ?? ""
        MKKauppa.jaettu.kutsuPaasaikeessa { hinta.withCString { valmis?(p != nil ? 1 : 0, $0) } }
    }
}

@_cdecl("MatkakirjaKauppa_Osta")
public func MatkakirjaKauppa_Osta(_ pyynto: Int32, _ tunnus: UnsafePointer<CChar>?, _ valmis: MatkakirjaKauppaOstettu?) {
    let t = tunnus.map { String(cString: $0) } ?? ""
    guard #available(iOS 15.0, *) else { valmis?(pyynto, -1, nil); return }
    Task {
        let k = MKKauppa.jaettu
        func vastaa(_ tulos: Int32, _ id: String) { k.kutsuPaasaikeessa { id.withCString { valmis?(pyynto, tulos, $0) } } }
        guard let p = await k.tuote(t) else { vastaa(-1, ""); return }
        do {
            switch try await p.purchase() {
            case .success(let v):
                switch v {
                case .verified(let tap):
                    let id = String(tap.id)
                    k.avoimet[id] = tap   // päätetään vasta hyvityksen jälkeen (MatkakirjaKauppa_Paata)
                    vastaa(1, id)
                case .unverified(let tap, let virhe):
                    NSLog("MATKAKIRJA kauppa: osto vahvistamaton: %@", String(describing: virhe))
                    await tap.finish()
                    vastaa(-1, "")
                }
            case .userCancelled: vastaa(0, "")
            case .pending: vastaa(2, "")
            @unknown default: vastaa(-1, "")
            }
        } catch {
            NSLog("MATKAKIRJA kauppa: osto %@: %@", t, String(describing: error))
            vastaa(-1, "")
        }
    }
}

@_cdecl("MatkakirjaKauppa_Kuuntele")
public func MatkakirjaKauppa_Kuuntele(_ uusi: MatkakirjaKauppaUusi?) {
    guard #available(iOS 15.0, *) else { return }
    let k = MKKauppa.jaettu
    k.kuuntelija?.cancel()
    k.kuuntelija = Task.detached {
        // Päättämättömät (sovellus suljettiin ennen hyvitystä tai odottava osto hyväksyttiin taustalla).
        for await tulos in Transaction.unfinished { await k.kasittele(tulos, uusi: uusi) }
        for await tulos in Transaction.updates { await k.kasittele(tulos, uusi: uusi) }
    }
}

@_cdecl("MatkakirjaKauppa_Paata")
public func MatkakirjaKauppa_Paata(_ tapahtuma: UnsafePointer<CChar>?) {
    let id = tapahtuma.map { String(cString: $0) } ?? ""
    guard #available(iOS 15.0, *) else { return }
    Task {
        let k = MKKauppa.jaettu
        guard let t = k.avoimet[id] else { return }
        await t.finish()
        k.avoimet[id] = nil
    }
}
