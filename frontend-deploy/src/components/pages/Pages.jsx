import { useState, useEffect } from "react";
import TaskCard from "../TaskCard";
import TaskDetailsModal from "../Tasklist";
import { getTasks } from "../../api";

export default function Home({ currentUser }) {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    console.log('Home useEffect, fetching tasks');
    getTasks()
      .then((data) => {
        console.log('Home tasks fetched:', data);
        const transformedTasks = data.map((task) => ({
          ...task,
          ngo: { id: task.ngo_id, name: task.ngo_name },
          date: task.due_date,
        }));
        console.log('Transformed tasks:', transformedTasks);
        setTasks(transformedTasks);
      })
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

  return (
    <div className="container home">
      <section className="hero card" style={{
        display: "flex",
        flexDirection: "column",
        padding: "30px",
        marginBottom: "30px"
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          alignItems: "center"
        }}>
          <div className="hero-left" style={{ flex: 1, minWidth: "300px" }}>
            <h2 style={{
              fontSize: "2.2rem",
              color: "#0a47d1",
              marginBottom: "15px"
            }}>
              Find Volunteer Opportunities Near You
            </h2>
            <p style={{
              fontSize: "1.1rem",
              color: "#555",
              marginBottom: "25px",
              lineHeight: "1.6"
            }}>
              Browse meaningful tasks posted by NGOs, sign up quickly, and make a real impact in your community.
              Filter by location or hours and join teams making a difference today.
            </p>
            <div className="hero-ctas" style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap"
            }}>
              <a className="btn primary" href="#tasks" style={{
                padding: "12px 24px",
                fontSize: "1.1rem"
              }}>
                Browse Tasks
              </a>
              <a className="btn outline" href="/add-task" style={{
                padding: "12px 24px",
                fontSize: "1.1rem"
              }}>
                Post a Task
              </a>
            </div>
          </div>
          <div className="hero-right" style={{ flex: 1, minWidth: "300px" }}>
            <div style={{
              backgroundColor: "#e6f0ff",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "100px",
                height: "100px",
                backgroundColor: "#007BFF",
                borderRadius: "50%",
                opacity: "0.1"
              }}></div>
              <div style={{
                position: "absolute",
                bottom: "-30px",
                left: "-30px",
                width: "120px",
                height: "120px",
                backgroundColor: "#ff8a3d",
                borderRadius: "50%",
                opacity: "0.1"
              }}></div>
              <h3 style={{
                color: "#0a47d1",
                marginBottom: "15px",
                fontSize: "1.5rem"
              }}>
                Make an Impact Today
              </h3>
              <div style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "20px",
                flexWrap: "wrap"
              }}>
                <div style={{
                  textAlign: "center",
                  padding: "10px",
                  minWidth: "100px"
                }}>
                  <div style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#0a47d1"
                  }}>
                    50+
                  </div>
                  <div style={{
                    fontSize: "0.9rem",
                    color: "#666"
                  }}>
                    Tasks Available
                  </div>
                </div>
                <div style={{
                  textAlign: "center",
                  padding: "10px",
                  minWidth: "100px"
                }}>
                  <div style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#0a47d1"
                  }}>
                    200+
                  </div>
                  <div style={{
                    fontSize: "0.9rem",
                    color: "#666"
                  }}>
                    Volunteers
                  </div>
                </div>
                <div style={{
                  textAlign: "center",
                  padding: "10px",
                  minWidth: "100px"
                }}>
                  <div style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#0a47d1"
                  }}>
                    25+
                  </div>
                  <div style={{
                    fontSize: "0.9rem",
                    color: "#666"
                  }}>
                    NGOs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tasks" className="section" style={{ marginBottom: "40px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}>
          <div>
            <h3 style={{
              fontSize: "1.8rem",
              color: "#0a47d1",
              margin: "0 0 5px 0"
            }}>
              Featured Tasks
            </h3>
            <p className="muted" style={{
              fontSize: "1.1rem",
              margin: "0"
            }}>
              Popular and recent volunteer opportunities
            </p>
          </div>
        </div>

        <div className="grid">
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} onView={() => setSelected(t)} />
          ))}
        </div>
      </section>

      <section className="how card" style={{
        padding: "30px",
        marginBottom: "30px"
      }}>
        <h3 style={{
          textAlign: "center",
          fontSize: "1.8rem",
          color: "#0a47d1",
          marginBottom: "30px"
        }}>
          How It Works
        </h3>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <div style={{
            flex: 1,
            minWidth: "200px",
            textAlign: "center",
            padding: "20px"
          }}>
            <div style={{
              width: "70px",
              height: "70px",
              backgroundColor: "#007BFF",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "white",
              fontSize: "2rem",
              fontWeight: "bold"
            }}>
              1
            </div>
            <h4 style={{
              color: "#0a47d1",
              marginBottom: "10px"
            }}>
              NGOs Post Tasks
            </h4>
            <p style={{
              color: "#666",
              lineHeight: "1.5"
            }}>
              Organizations describe what they need and where. Tasks range from environmental conservation to community support.
            </p>
          </div>
          <div style={{
            flex: 1,
            minWidth: "200px",
            textAlign: "center",
            padding: "20px"
          }}>
            <div style={{
              width: "70px",
              height: "70px",
              backgroundColor: "#ff8a3d",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "white",
              fontSize: "2rem",
              fontWeight: "bold"
            }}>
              2
            </div>
            <h4 style={{
              color: "#0a47d1",
              marginBottom: "10px"
            }}>
              Volunteers Browse
            </h4>
            <p style={{
              color: "#666",
              lineHeight: "1.5"
            }}>
              Browse tasks that match your interests, skills, and availability. View details and application statistics.
            </p>
          </div>
          <div style={{
            flex: 1,
            minWidth: "200px",
            textAlign: "center",
            padding: "20px"
          }}>
            <div style={{
              width: "70px",
              height: "70px",
              backgroundColor: "#28a745",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              color: "white",
              fontSize: "2rem",
              fontWeight: "bold"
            }}>
              3
            </div>
            <h4 style={{
              color: "#0a47d1",
              marginBottom: "10px"
            }}>
              Sign Up & Connect
            </h4>
            <p style={{
              color: "#666",
              lineHeight: "1.5"
            }}>
              Sign up with a brief message. NGOs review applications and coordinate with selected volunteers.
            </p>
          </div>
        </div>
      </section>

      {selected && (
        <TaskDetailsModal task={selected} currentUser={currentUser} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
