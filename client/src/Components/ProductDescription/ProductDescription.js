// ProductDetails.js
import React, { useState } from "react";

const ProductDescription = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [qaList, setQaList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  // Handle Q&A form
  const handleQaSubmit = (e) => {
    e.preventDefault();
    const question = e.target.question.value.trim();
    if (question !== "") {
      setQaList([...qaList, question]);
      e.target.reset();
    }
  };

  // Handle Review form
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = e.target.review.value.trim();
    const rating = e.target.rating.value;
    if (review !== "" && rating !== "") {
      setReviewList([...reviewList, { review, rating }]);
      e.target.reset();
    }
  };

  return (
    <div className="product-details">
      {/* ---- Your offer section goes here ---- */}

      {/* Tabs Section */}
      <div className="product-tabs">
        <ul className="tab-header">
          <li
            className={activeTab === "description" ? "active" : ""}
            onClick={() => setActiveTab("description")}
          >
            Description
          </li>
          <li
            className={activeTab === "specification" ? "active" : ""}
            onClick={() => setActiveTab("specification")}
          >
            Specification
          </li>
          <li
            className={activeTab === "qa" ? "active" : ""}
            onClick={() => setActiveTab("qa")}
          >
            Q & A
          </li>
          <li
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </li>
          <li
            className={activeTab === "tags" ? "active" : ""}
            onClick={() => setActiveTab("tags")}
          >
            Tags
          </li>
        </ul>

        {/* Description */}
        {activeTab === "description" && (
          <div className="tab-content">
            <h3>Overview:</h3>
            <ul>
            <li>NVIDIA Blackwell Architecture</li>
            <li>5th Generation Tensor cores</li>
            <li>4th Generation RT cores</li>
            <li>NVIDIA DLSS 4</li>
            <li>Game Ready and NVIDIA Studio Drivers</li>
            <li>NVIDIA GeForce Experience</li>
            <li>NVIDIA Broadcast, NVIDIA G-SYNC&nbsp;</li>
            <li>8GB GDDR6 graphics memory</li>
            <li>Dual 90mm BladeLink Fans</li>
            <li>ZOTAC GAMING FireStorm Utility</li>
            <li>SFF-Ready compact footprint</li>
            <li>Metal Backplate</li>
           </ul>
          </div>
        )}

        {/* Specification */}
        {activeTab === "specification" && (
          <div className="tab-content">
            <div className="tab-content">
            <h3>Specification</h3>
            <table className="table">
                <thead>
                <tr>
                    <th colSpan="2">
                    <strong>GRAPHICS</strong>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Model</td>
                    <td>ZT-B50500H-10M</td>
                </tr>
                <tr>
                    <td>Chipset</td>
                    <td>NVIDIA GEFORCE</td>
                </tr>
                <tr>
                    <td>GPU</td>
                    <td>RTX 5050</td>
                </tr>
                <tr>
                    <td>Engine Clock</td>
                    <td>2602 MHz</td>
                </tr>
                <tr>
                    <td>PCI EXPRESS</td>
                    <td>5.0</td>
                </tr>
                <tr>
                    <td>MEMORY CLOCK</td>
                    <td>20 Gbps</td>
                </tr>
                <tr>
                    <td>MEMORY SIZE</td>
                    <td>8 GB</td>
                </tr>
                <tr>
                    <td>MEMORY INTERFACE</td>
                    <td>128-BIT</td>
                </tr>
                <tr>
                    <td>MEMORY TYPE</td>
                    <td>GDDR6</td>
                </tr>
                <tr>
                    <td>OpenGL</td>
                    <td>4.6</td>
                </tr>
                <tr>
                    <td>PORTS</td>
                    <td>HDMI, DisplayPort</td>
                </tr>
                <tr>
                    <td>DirectX</td>
                    <td>12 Ultimate</td>
                </tr>
                <tr>
                    <td>RESOLUTION</td>
                    <td>7680 x 4320</td>
                </tr>
                <tr>
                    <td>COOLER</td>
                    <td>Dual Fan</td>
                </tr>
                <tr>
                    <td>Max Display Support</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>Recommended PSU</td>
                    <td>550W</td>
                </tr>
                <tr>
                    <td>GPU CORE (CUDA CORE)</td>
                    <td>2560</td>
                </tr>
                <tr>
                    <td>POWER CONNECTORS</td>
                    <td>1 x 8-pin</td>
                </tr>
                <tr>
                    <td>WARRANTY</td>
                    <td>3+2 Years</td>
                </tr>
                <tr>
                    <td>NOTE**</td>
                    <td>
                    <span style={{ color: "#ff0000" }}>
                        Features, Price and Specifications are subject to change without
                        notice. Images used for Representation Purpose Only.
                    </span>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
        )}

        {/* Q & A */}
        {activeTab === "qa" && (
          <div className="tab-content">
            {qaList.length === 0 && (
              <p>No questions have been asked about this product.</p>
            )}
            <h3>Ask a question</h3>
            <form className="qa-form" onSubmit={handleQaSubmit}>
              <div className="form-row">
                <label>
                  Your Name
                  <input type="text" name="name" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" required />
                </label>
              </div>

              <div className="form-group">
                <label>Your Question</label>
                <textarea name="question" required></textarea>
              </div>
              <p className="note">Note: HTML is not translated!</p>

              <div className="form-actions">
                <button type="submit" className="continue-btn">Continue</button>
              </div>
            </form>

            <div className="qa-list">
              {qaList.map((q, idx) => (
                <div key={idx} className="qa-item">
                  <strong>{q.name}</strong>: {q.question}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Reviews */}
        {activeTab === "reviews" && (
        <div className="tab-content">
          <h3>Write a review</h3>
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <div className="form-group">
              <label>
                * Your Name
                <input type="text" name="name" required />
              </label>
            </div>
             <div className="form-group">
              <label>
                * Your Review
                <textarea name="review" required></textarea>
              </label>
            </div>

            <div className="form-group rating-group">
              <label>* Rating</label>
              <div className="rating-options">
                <span>Bad</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star}>
                    <input
                      type="radio"
                      name="rating"
                      value={star}
                      required
                    />
                    {"⭐".repeat(star)}
                  </label>
                ))}
                <span>Good</span>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="back-btn">Back</button>
              <button type="submit" className="continue-btn">Continue</button>
            </div>
          </form>

          <div className="review-list">
            {reviewList.map((r, idx) => (
              <div key={idx} className="review-item">
                <strong>{r.name}</strong>
                <p>{r.review}</p>
                <span>Rating: {"⭐".repeat(r.rating)}</span>
              </div>
            ))}
          </div>
        </div>
)}
         {/* Tags */}
        {activeTab === "tags" && (
          <div className="tab-content active" id="tab-tag"> 
            <span class="tag-item">
            <a href="https://mdcomputers.in?route=product/search&amp;search=RTX-5080">RTX-5080</a>
            </span> 
            <span class="tag-item">
            <a href="https://mdcomputers.in?route=product/search&amp;search=Triple-Fan-GPU">Triple-Fan-GPU</a>
            </span> 
            <span class="tag-item">
            <a href="https://mdcomputers.in?route=product/search&amp;search=16GB-Graphic">16GB-Graphic</a>
            </span> 
            <span class="tag-item">
            <a href="https://mdcomputers.in?route=product/search&amp;search=RTX-50-Series">RTX-50-Series</a>
            </span> 
            <span class="tag-item">
            <a href="https://mdcomputers.in?route=product/search&amp;search=Shadow-GPU">Shadow-GPU</a>
            </span> 
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
