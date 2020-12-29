defmodule KV.Bucket do
  use Agent

  @doc """
  starts a new instance of an agent
  """
  def start_link(_opts) do
    Agent.start_link(fn -> %{} end)
  end

  @doc """
  gets a value from a bucket by the key
  """
  def get(bucket, key) do
    Agent.get(bucket, &Map.get(&1, key))
  end

  @doc """
  sets a value in the bucket by the key
  """
  def put(bucket, key, value) do
    Agent.update(bucket, &Map.put(&1, key, value))
  end
end
