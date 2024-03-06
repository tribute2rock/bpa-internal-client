import React, { useEffect, useState } from 'react';
import './Form_BG.css';

const Form_BG = (props) => {
  const { type, isEdit, requestValues } = props;
  const [data, setData] = useState({});

  useEffect(() => {
    const convertedValue = {};
    requestValues?.forEach((item) => {
      convertedValue[item.name] = item.value ? JSON.parse(item.value) : null;
    });
    setData(convertedValue);
  }, [requestValues, isEdit, type]);

  return (
    <div>
      <div className="mt-3">
        <div className="row">
          <div className="col-6">
            <h6 className="heading-title">
              <span>
                GUARANTEE TO BE ISSUED -ON ACCOUNT OF
                <br />
                (जमानत निवेदन व्यक्ति / फर्म / कम्पनीका नाम र ठेगाना)
              </span>
            </h6>
            <div className="form-group px-2">
              <label>Individual/Company/Firm Name (व्यक्ति/कम्पनी/फर्मको नाम)</label>
              <div>{data?.company_name}</div>
            </div>
            <div className="form-group px-2">
              <label>Individual/Company/Firm Address (व्यक्ति/कम्पनी/फर्मको ठेगाना)</label>
              <div>{data?.company_address}</div>
            </div>
          </div>
          <div className="col-6">
            <h6 className="heading-title">
              <span>
                NAME AND ADDRESS OF BENEFICIARY
                <br />
                (हिताधिकारीको नाम र ठेगाना)
              </span>
            </h6>
            <div className="form-group px-2">
              <label>
                <div>Beneficiary Name (हिताधिकारीको नाम)</div>
              </label>
              <div>{data?.beneficiary_name}</div>
            </div>
            <div className="form-group px-2">
              <label>Beneficiary Address (हिताधिकारीको ठेगाना)</label>
              <div>{data?.beneficiary_address}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <h6 className="heading-title">
              <span>
                CURRENCY &amp; AMOUNT
                <br />
                (मुद्रा र रकम)
              </span>
            </h6>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="form-group px-2">
                  <label>Currency (मुद्रा)</label>
                  <div>{data?.currency}</div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="form-group px-2">
                  <label>Amount In Figures (अंकमा रकम)</label>
                  <div>{data?.currency_amount}</div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group px-2">
                  <label>Amount In Words (शब्दमा रकम)</label>
                  <div>{data?.currency_word}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <h6 className="heading-title">
              <span>
                TYPE OF GUARANTEE
                <br />
                (जमानतको प्रकार)
              </span>
            </h6>
            <div className="form-group px-2">
              <label>Selected Guarantee Type</label>
              <div>{data?.type_of_guarantee}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <h6 className="heading-title">
              <span>
                VALIDITY(MM/DD/YYYY) IN GREGORIAN CALENDAR
                <br />
                (मान्य अवधि(महिना/दिन/साल) ईस्वी सम्वत)
              </span>
            </h6>
            {data.date_from && (
              <div className="row align-items-center" id="ValidityRowId">
                <div className="col-5">
                  <div className="form-group">
                    <label>From (बाट)</label>
                    <div>{data?.date_from}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label>Till (सम्म)</label>
                    <div className="dataValue">{data?.date_till}</div>
                  </div>
                </div>
              </div>
            )}
            {data.validity_period && (
              <>
                <div className="row align-items-center" id="validityPeriodRowId">
                  <div className="col-11">
                    <div className="form-group">
                      <label>Validity Period (मान्यता अवधि)</label>
                      <div className="row align-items-center m-0">
                        <div className="dataValue">{data?.validity_period}</div>
                        <span className="dataValue">{data?.validity_period_select}</span>
                        From
                        <span className="dataValue">
                          {data?.validity_date_type === 'date-period' ? data?.validity_period_date : null}
                        </span>
                        <span className="dataValue">
                          {data?.validity_date_type === 'Date of Issuance' ? 'Date Of Issuance' : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {data?.expiry_date && (
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <div className="dataValue">{data?.expiry_date}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-6">
            <h6 className="heading-title">
              <span>
                CLAIM VALIDITY
                <br />
                (दाबिको अवधि)
              </span>
            </h6>
            <div className="form-group">
              <div className="form-check form-check-inline ">
                <label>Claim Validity (दाबिको अवधि)</label>
              </div>
            </div>
            {data.claim_validity_type === 'Type One' && (
              <>
                <div className="row align-items-center  form-group">
                  <div className="col-11">
                    <div className="dataValue">{data?.claim_validity}</div>
                  </div>
                </div>
              </>
            )}
            {data.claim_validity_type === 'Type Two' && (
              <div className="row align-items-center form-group">
                <div className="col-11">
                  <div className="row align-items-center m-0">
                    <div className="dataValue">{data?.claim_validity_period}</div>
                    <span className="dataValue">{data?.claim_validity_period_select}</span>
                    <span className="col-6">From Expiry Date</span>
                  </div>
                </div>
              </div>
            )}
            {data?.claim_expiry_date && (
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label>Claim Expiry Date</label>
                    <div className="dataValue">{data?.claim_expiry_date}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <label>Purpose of Guarantee(जमानतको उद्देश्य)</label>
              <div className="dataValue">{data?.purpose_of_guarantee}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Contract Number (ठेक्का नं)</label>
              <div className="dataValue">{data?.contract_number}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h6 className="heading-title">
              <span>
                PLEASE HANDOVER THE ORIGINAL GUARANTEE TO
                <br />
                (कृपया मूल जमानतको हस्तान्तरण गर्नुहोस्)
              </span>
            </h6>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Name(नाम)</label>
              <div className="dataValue">{data?.org_guarantee_name}</div>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Having Specimen Signature / ID ref (दस्तखत नमूना र परिचत पत्र न.)</label>
              <div className="dataValue">{data?.signature_id}</div>
            </div>
          </div>
          <div className="col-12">
            <h6 className="heading-title">
              <span>
                PLEASE DEBIT OUR FOLLOWING ACCOUNT FOR NECESSARY MARGIN AND CHARGES.
                <br />
                (कृपया आवश्यक मार्जिन र शुल्कहरूको लागि हाम्रो निम्न खाता डेबिट गर्नुहोस्।)
              </span>
            </h6>
            <div className="form-group">
              <div className="dataValue">{data?.account_number}</div>
            </div>
          </div>
        </div>
        <h6 className="heading-title">
          <span>
            IN CASE APPLICATION IS FOR COUNTER GUARANTEE
            <br />
            (यदी जमानतको आवेदन काउन्टर जमानतको लागि भएमा)
          </span>
        </h6>
        <div className="row align-items-center">
          <div className="col-4">
            Charges - other than GIBL:
            <br />
            (सुल्कहरु - जिआइबिएल देखि छुट्टै)
            <div className="form-group">
              {data.charges_radio === 'Applicant' && <div className="dataValue">Applicant(आवेदक)</div>}
              {data.charges_radio === 'Beneficiary' && <div className="dataValue">Beneficiary(हिताधिकारी)</div>}
            </div>
          </div>
          <div className="col-3">
            <div className="form-group">
              <div className="form-check form-check-inline">
                <label className="form-check-label" for=" corresponding_banks">
                  Claim Period for corresponding banks(संवाददाता बैंकहरूको लागि दाबी अवधि)
                </label>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="form-group">
              <div className="dataValue">{data?.corresponding_banks}</div>
            </div>
          </div>
        </div>
        We request you to issue bank guarantee as per above details. In making this request, we hereby commit to abide by
        bank's policies and all applicable regulatory provisions and latest /prevalling Uniform Rules for Demand Guarantee
        (URDG) and hereby unconditionally and irrevocably undertake to pay any claim or claims under this guarantee without
        any arguments whatsoever. We also authorize you to debit our account and/or to book loan as you may deem necessary in
        our name to honor the claim(s) and also for charges and other expenses as may be applicable.
        <p>
          We hereby also confirm our understanding and agreement that our liability under the guarantee issued in favor of
          Government of Nepal, Customs Offices shall continue to remain valid even beyond the expiry date of the guarantee
          untill either the original guarantee is returned to the Bank and /or cancellation of the same is confirmed in
          writing to the Bank by the Beneficiary. You are also authorized to debit our account for commission and charges
          from expiry of the guarantee till its cancellation.
        </p>
        माथि उल्लेख गरिए बमोजिम बैंक जमानत जारी गरिदिनु हुन अनुरोध छ। बैक तथा वित्तीय संस्थाको बैंक जमानतका सम्बन्धमा प्रचलित
        कानुन, नियम, नीति तथा प्रचलनमा रहेको Uniform Rules for Demand Guarantee(URDG) अनुसार विना शर्त अपरिहार्य रुपमा
        जमानतबाट उत्पन्न हुने सम्पूर्ण दाबी सोबाट उत्पन्न हुने अन्य खर्च समेत विना विवाद निर्विवादित रुपमा जुनसुकै अवस्थामा
        पनि तिर्न बुझाउन प्रतिबद्धता गर्दछु । साथै जमानीबाट उत्पन्न दायित्वको भुक्तानी, आवश्यक शुल्क, फि म/वा मेरो तर्फवाट
        दिएको अवस्थामा बाट उत्पन्न दायित्वलाई म/वा मेरो खातामा रहेको रकमबाट खर्च लेखी जमानीको दायित्वको हिसाब मिलान गरेमा वा
        आवश्यकतानुसार म/वा मेरो नाम ऋणीमा समाबेश गरी force loan खडा गरेमा समेत मेरो पूर्ण मन्जुरी रहेको छ।
        <p>
          साथै बैंकबाट नेपाल सरकार, भन्सार कार्यालयका लागी जारी गरिएको जमानतको अबधि समाप्त भएको अवस्थामा समेत सो जमानतबाट
          उत्पन्न दायित्व निरन्तर रुपमा कायम रहिरहनेछ जबसम्म जारी गरिएको सक्कल जमानतको प्रति हितकारीबाट फिर्ता नभएसम्म वा
          हिताधिकारिबाट जमानतको दायित्व नरहेको भन्नै सम्बन्धमा लिखित रुपमा बैंकलाई जानकारी प्राप्त नभएसम्म बैंकबाट जारी
          गरिएको जमानतको दायित्वबाट उत्पन्न दायित्व म/वा मेरो/वा हाम्रो लागि निरन्तर रुपमा कायम रहिरहनेछ भन्ने कुरामा
          मेरो/हाम्रो मन्जुरी रहेको छ । सो जमानत बापत लाग्ने कमिशन, चार्ज जमानीको दायित्व नसकिए सम्म सो जमानतबाट उत्पन्न
          दायित्वलाई म/वा मेरो खातामा रहेको रकमवाट खर्च लेखी जमानीको दायित्वको हिसाबमा मिलान गरेमा समेत मेरो मञ्जुरी रहेको छ
          ।
        </p>
        <div className="row pt-2 pb-2">
          <div className="col-6 form-group">
            <div className="row">
              <div className="col-6 form-group">
                <label for="firm_name">
                  Name of the Individual/Firm/Company
                  <br />
                  (व्यक्ति/फर्म/कम्पनीको नाम)
                </label>
              </div>
              <div className="col-6 form-group">
                <div className="dataValue">{data?.firmName}</div>
              </div>
              <div className="form-group px-2">
                <label>Individual/Company/Firm Address (व्यक्ति/कम्पनी/फर्मको ठेगाना)</label>
                <div className="dataValue">{data?.company_address}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label for="pan_number">Enter Your Pan Number(प्यान नम्बर)</label>
              </div>
              <div className="col-6 form-group">
                <div className="dataValue">{data?.pan_number}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label for="seal">Seal Of the Firm/Company(फर्म/कम्पनी को छाप)</label>
              </div>
              <div className="col-6 form-group">
                <div className="dataValue">{data?.seal}</div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="ml-2 alert alert-danger counter-guarantee-notice">
              Is the Bank Guarantee to be issued on behalf of 3rd party or JV?
              <div className="form-group">
                {data.counter_check === 'cg yes' && <div className="dataValue">Yes</div>}
                {data.counter_check === 'cg no' && <div className="dataValue">No</div>}
              </div>
            </div>
          </div>
        </div>
        {data?.counter_check === 'cg yes' && (
          <div className="row justify-content-center counter-guarantee-form">
            <div className="col-8 border p-2 mb-4">
              <div className="">
                <h6 className="heading-title">
                  <span>
                    FOR COUNTER GUARANTEE
                    <br />
                    (यदी जमानतको आवेदन काउन्टर जमानतकौ लागि भएमा)
                  </span>
                </h6>
                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label>Guarantee ref. No</label>
                      <div className="dataValue">{data?.cg_ref_no}</div>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="form-group">
                      <label>
                        For <span className="currency-short">{data.currency_short}</span>
                      </label>
                      <div className="dataValue">{data?.currency_amount}</div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label>Favoring M/S</label>
                      <u>
                        <span className="dataValue text-decoration-underline">{data?.favouring_ms}</span>
                      </u>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <p className="text-justify">
                      In considerations of your signing the above letter of guarantee for
                      <u>
                        <span className="font-weight-bold currency-short ml-1">{data?.currency_short}</span>
                        <span className="font-weight-bold" id="for_rs1" name="for_rs1">
                          {data?.for_rs1}
                        </span>
                        (<span className="font-weight-bold currency-full ml-1 mr-1">{data?.currency_full}</span>
                        <span className="font-weight-bold" id="for_rsw1" name="for_rsw1">
                          {data?.for_rsw1}
                        </span>
                        )
                      </u>
                      in favour of
                      <u>
                        <span className="font-weight-bold" id="principal_creditor" data-label="Principal Creditor">
                          {data?.principal_creditor}
                        </span>
                      </u>
                      (principal creditor) at our request we undertake to indemnity and hold you harmless against any claims,
                      damage or cost arising under the said guarantee in the event of you being called upon to pay to
                      <u>
                        <span className="font-weight-bold" id="beneficiary_name_1" data-label="Beneficiary Name 1">
                          {data?.beneficiary_name_1}
                        </span>
                      </u>
                      (beneficiary) the amount of
                      <u>
                        <span className="font-weight-bold currency-short ml-1">{data?.currency_short}</span>
                        <span className="font-weight-bold mr-1 ml-1" id="for_rs2" name="for_rs2">
                          {data?.for_rs2}
                        </span>
                        (<span className="font-weight-bold currency-full">{data?.currency_word}</span>
                      </u>
                      ) or part thereof in terms of the guarantee executed by you in their favor, you shall be deemed
                      entitled to pay the amount to them without any reference to us and we shall on demand from you make
                      good such amount to you to the extent of
                      <u>
                        <span className="font-weight-bold currency-short  ml-1 mr-1">{data?.currency_short}</span>
                        <span className="font-weight-bold" id="for_rs3" name="for_rs3">
                          {data?.for_rs3}
                        </span>
                        (<span className="font-weight-bold currency-full">{data?.currency_full}</span>
                        <span className="font-weight-bold" id="for_rsw3" name="for_rsw3">
                          {data?.for_rsw3}
                        </span>
                      </u>
                      ) with interest at the rate of
                      <span className="dataValue">{data?.cg_intrestRate}</span>. % per annum upto the date of payment. Your
                      statement to the effect that such a payment have been made by you under the guarantee referred to
                      therein shall be conclusive and binding on us without any proof being called upon. In the event of our
                      failing to discharge our liabilities to you under this indemnity you shall be entitled to exercise your
                      lien on the balances in our accounts maintained with your branch or any other branch of your company/
                      bank or monies, shares, securities belonging to us which may be held by you or which may come to your
                      hands as bankers and appropriate the same to the extent of
                      <u>
                        <span className="font-weight-bold currency-short ml-1 mr-1">{data?.currency_short}</span>
                        <span className="font-weight-bold" id="for_rs4" name="for_rs4">
                          {data?.for_rs4}
                        </span>
                        (<span className="font-weight-bold currency-full ml-1 mr-1">{data.currency_full}</span>
                        <span className="font-weight-bold" id="for_rsw4" name="for_rsw4">
                          {data?.for_rsw4}
                        </span>
                        )
                      </u>
                      towards our liabilities under this indemnity.
                    </p>
                    <p className="text-justify">
                      <b>
                        You are unconditionally authorized to debit my/ our company/ firm account No{' '}
                        <span id="account_number1" data-label="Account Number 1">
                          {data?.account_number1}
                        </span>
                        maintained with you for the amount of claim (if any) under this bank guarantee.
                      </b>
                    </p>
                    <p>
                      This indemnity shall be continuing security binding on us and shall remain in force and effect up to
                      <div className="dataValue">{data?.validity_1}</div>
                    </p>
                  </div>
                  <div className="col-6">
                    <p>
                      Dated the <div className="dataValue">{data?.dated_the}</div>
                    </p>
                  </div>
                  <div className="col-6">
                    <p>
                      For <div className="dataValue">{data?.counter_for}</div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-none">
              <input type="text" name="for_rs1" id="input_for_rs1" data-label="CG Amount 1" />
              <input type="text" name="for_rsw1" id="input_for_rsw1" data-label="CG Amount 2" />
              <input
                type="text"
                name="principal_creditor"
                id="input_principal_creditor"
                data-label="CG Principal Creditor"
              />
              <input type="text" name="beneficiary_name_1" id="input_beneficiary_name_1" data-label="CG Beneficiary Name" />
              <input type="text" name="for_rs2" id="input_for_rs2" data-label="CG Amount 3" />
              <input type="text" name="for_rsw2" id="input_for_rsw2" data-label="CG Amount 4" />
              <input type="text" name="for_rsw3" id="input_for_rsw3" data-label="CG Amount 6" />
              <input type="text" name="for_rs3" id="input_for_rs3" data-label="CG Amount 5" />
              <input type="text" name="currency_word" id="input_currency_word" data-label="CG Amount 7" />
              <input type="text" name="for_rs4" id="input_for_rs4" data-label="CG Amount 8" />
              <input type="text" name="for_rsw4" id="input_for_rsw4" data-label="CG Amount 9" />
              <input type="text" name="account_number1" id="input_account_number1" data-label="Account Number 1" />
              <input id="input_favouring_ms" name="favouring_ms" data-label="CG Favouring" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form_BG;