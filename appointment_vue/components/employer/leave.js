export const AdminLeave = {
  template: `
    <div class="leaves">
      <h1>Leaves</h1>
      <div class="main-content-leave">
        <div class="leave-request">
          <div class="leavepage-header">
            <span>Leave Request</span>
            <i class="info-icon">i</i>
          </div>
          <table class="leave-table">
            <thead>
              <tr>
                <th>Duration</th>
                <th>Type</th>
                <th>Days</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Apr 20 – Apr 21</td>
                <td>Sick Leave</td>
                <td>02</td>
                <td><span class="status pending">Pending</span></td>
              </tr>
              <tr>
                <td>Apr 20 – Apr 21</td>
                <td>Casual Leave</td>
                <td>01</td>
                <td><span class="status approved">Approved</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="leaves-summary">
          <div class="leavepage-header">
            <span class="title">Leaves</span>
            <div class="leave-stats">
              <div class="progress-circle">
                <span>05/10</span>
              </div>
              <div class="stats-info">
                <p>Available – 05</p>
                <p>On Leave – 02</p>
              </div>
            </div>
          </div>

          <div class="on-leave">
            <div class="on-leave-header">
              <span>Who’s on Leave</span>
              <div class="dropdown">
                <button class="dropdown-btn">Today</button>
                <!-- Dropdown options can be added here -->
              </div>
            </div>
            <div class="on-leave-list">
              <div class="leave-item">
                <div class="profile-icon" style="background-color: #bbb">
                  TK
                </div>
                <div class="details">
                  <p class="name">Tejas Khanna</p>
                  <p class="info">Apr 20 . Casual Leave</p>
                </div>
              </div>
              <div class="leave-item">
                <div class="profile-icon" style="background-color: #6a5acd">
                  GK
                </div>
                <div class="details">
                  <p class="name">Gaurav Khanna</p>
                  <p class="info">Apr 20 . Half Leave</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
};
